import './App.css';

import * as React from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import { interactWithItem, setPlayerLocation, multiItemResponse } from './actions/player';
import { Chat, Gamemap, RoomComponent, PlayerComponent, Compass } from './components';
import { Direction, Item, Room, StoreState, PlayerAction } from './types';
import { handleChatInput, clearChatOutput,  } from './actions/user';
import { LuisHelper } from './helpers/LuisHelper';
import { InventoryItem } from './components/inventory';
import { List } from 'semantic-ui-react';

interface DispatchProps {
  handleChatInput: (arg: string, author?: string) => void;
  multiItemResponse: (items: Item[], room: Room, action: PlayerAction) => void;
  clearChatOutput: () => void;
  interactWithItem: (item: Item, room: Room | undefined, action: PlayerAction) => void;
  setPlayerLocation: (location: [number, number]) => void;
}

type Props = StoreState & DispatchProps;

/** 
 * top level component.
 */
class App extends React.Component<Props> {

  message$ = new Rx.Subject<string>();
  /**
   * basic bot logic. 
   */
  logic = (text: string) => {

    let currentExitTest = /Exit (.*)/i.exec(text);
    let currentItemPickUpTest = /Pick Up (.*)/i.exec(text);
    let currentItemDropTest = /Drop (.*)/i.exec(text);
    let clearCheck = /clear/i.exec(text);

    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location)!;

    // tslint:disable-next-line: max-line-length
    if (currentExitTest || currentItemDropTest || currentItemPickUpTest || clearCheck || this.props.message.conversationTopic === 'MULTI_ITEM') {

      if (!currentExitTest && !currentItemDropTest && !currentItemPickUpTest && !clearCheck) {
        let luisResponse = LuisHelper.ParseTextThroughLuis(text);
        luisResponse.then(this.parseMultiItemLuisResponse);
      }

      this.props.handleChatInput(text);

      if (clearCheck) {
        this.props.clearChatOutput();
      }

      if (currentExitTest) {
        let result = currentExitTest[1].trim().toLowerCase().split(' ');
        let direction = result[result.length - 1][0].toUpperCase() as Direction;
        this.go(direction);
      }

      if (currentItemPickUpTest) {
        let itemName = currentItemPickUpTest[1].trim().toLowerCase();
        let foundItems = currentRoom.inventory
          .filter(item => item.name.toLowerCase() === itemName);
        if (foundItems && foundItems.length === 1) {
          this.givePlayerItem(foundItems[0]);
        } else if (foundItems.length > 1) {
          this.startMultiItemConversationChain(foundItems, PlayerAction.addItem);
        } else {
          this.props.handleChatInput(`Item is not avaible for pick up`, 'Bot');
        }
      }

      if (currentItemDropTest) {
        let itemName = currentItemDropTest[1].trim().toLowerCase();
        let foundItems = this.props.player!.inventory.filter(item => item.name.toLowerCase() === itemName);
        if (foundItems && foundItems.length === 1) {
          this.giveRoomItem(foundItems[0]);
        } else if (foundItems.length > 1) {
          this.startMultiItemConversationChain(foundItems, PlayerAction.removeItem);
        } else {
          this.props.handleChatInput(`Item can not be found in player inventory`, 'Bot');
        }
      }
    } else {
      this.props.handleChatInput(`I don't understand ${text} command!`, 'Bot');
    }
  }

  /**
   * method that accepts a direction which player will go. 
   */
  go = (direction: Direction) => {
    let { location } = this.props.player!;
    if (this.props.dungeon!.map.isDoorway(location, direction)) {
      let nextRoom = this.props.dungeon!.map.coordinatesForRoomInGivenDirection(location, direction);
      this.props.setPlayerLocation(nextRoom);
      this.props.handleChatInput(`you exited the room via ${direction} exit.`, 'Bot');
    } else {
      this.props.handleChatInput(`No viable exit strategy to the ${direction}`, 'Bot');
    }
  }

  getCurrentRoom(rooms: Map<string, Room>, location: [number, number]) {
    return rooms.get(location.toString());
  }
  givePlayerItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    return this.props.interactWithItem(item, currentRoom, PlayerAction.addItem);
  }

  giveRoomItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    return this.props.interactWithItem(item, currentRoom, PlayerAction.removeItem);
  }

  startMultiItemConversationChain(items: Item[], action: PlayerAction) {
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    return this.props.multiItemResponse(items, currentRoom!, action);
  }

  componentDidMount() {
    this.props.setPlayerLocation(this.props.dungeon!.map.startingRoom());
    this.message$.subscribe(this.logic);
  }

  componentWillUnmount() {
    this.message$.unsubscribe();
  }
  multiItemPicker = () => this.props.multiItem.items.map(
    (item, index) => (
      <InventoryItem 
        key={item.id + item.type} 
        item={item} 
        index={index + 1}
        // tslint:disable-next-line: max-line-length
        InteractWithItem={(it) => this.props.interactWithItem(it, this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location), this.props.multiItem.priorAction!)}
        unique={false}
        popupValue={`${this.props.multiItem.priorAction!.toLowerCase()}`}
      />
    )
  )

  parseMultiItemLuisResponse = (resp: any) => {
    let { multiItem, interactWithItem } = this.props;
    let it = multiItem.items[parseInt(resp.entities[0].resolution.values[0]) - 1];
      debugger;
    interactWithItem(it, multiItem.room, multiItem.priorAction!);
  }

  public render(): JSX.Element {

    let { player, message, dungeon } = this.props;
    let currentRoom = this.getCurrentRoom(dungeon.rooms, player.location);
    let divStyle = currentRoom ? {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: currentRoom!.color,
      margin: 5,
      padding: 15
    } : {};

    let description = currentRoom ? currentRoom.description : 'Mjolnir Room';

    return (
      <div className={'parent'}>
        <p className="center title" style={divStyle}>{description}</p>

        {message.conversationTopic === 'MULTI_ITEM' ?
          <List 
            id="duplicateItems"
            divided={true}
            selection={true}
            celled={true}
          > 
            {this.multiItemPicker()} 
          </List> : 
          <div/>
        }

        <PlayerComponent
          player={player!}
          dropItem={this.giveRoomItem}
        />

        <RoomComponent
          playerPickUpItem={this.givePlayerItem}
          currentRoom={currentRoom}
        />
        <Gamemap
          mapPath={dungeon!.map}
          playerLocation={player!.location}
        />

        <Chat
          messageList={message.messageList}
          handleUserChatInput={this.message$}
        />

        <div id={'compass'}>
          {dungeon!.map.possibleExits(player!.location).map(
            (
              door,
              index) =>
              <Compass
                key={index}
                exitDirection={door}
                go={this.go}
              />
          )
          }
        </div>
      </div>
    );
  }
}

const actionCreator = {
  handleChatInput,
  clearChatOutput,
  setPlayerLocation,
  multiItemResponse,
  interactWithItem 
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return {
    message: state.message,
    player: state.player,
    dungeon: state.dungeon,
    multiItem: state.multiItem
  };
};

export default connect<StoreState, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);
