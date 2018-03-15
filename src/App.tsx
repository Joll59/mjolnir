import './App.css';

import * as React from 'react';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as Rx from 'rxjs';
import 'isomorphic-fetch';
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

import { removeItem, addItem, setPlayerLocation } from './actions/player';
import { Chat, Gamemap, RoomComponent, PlayerComponent, Compass } from './components';
import { Direction, Item, Room, StoreState } from './types';
import { handleUserChatInput, clearChatOutput } from './actions/user';



interface DispatchProps {
  handleUserChatInput: (arg :string) => {};
  clearChatOutput: () => {};
  addItem: (Item: Item, room: Room | undefined) => {};
  removeItem: (Item: Item, room: Room | undefined) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

type Props = StoreState & DispatchProps;

/** 
 * top level component.
 */
class App extends React.Component<Props, StoreState> {

  message$ = new Rx.Subject<string>();
  /**
   * basic bot logic. 
   */

  logic = (text: string) => {
    this.props.handleUserChatInput(text);

    const clearCheck = /clear/.exec(text)
    if (clearCheck){
      this.props.clearChatOutput();
    }

    let currentExitTest = /Exit (.*)/i.exec(text);
    if (currentExitTest) {
      let result = currentExitTest[1].trim().toLowerCase().split(' ');
      let direction = result[result.length - 1][0].toUpperCase() as Direction;
      this.go(direction);
    }

    let currentItemPickUpTest = /Pick Up (.*)/i.exec(text);
    if (currentItemPickUpTest) {
      let itemName = currentItemPickUpTest[1].trim();
      let foundItem = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location)!.inventory
        .filter(item => item.name === itemName);
      if (foundItem && foundItem.length === 1) {
        this.givePlayerItem(foundItem[0]);
      } else if (foundItem.length > 1){
        console.log(foundItem);
      }
    }

    let currentItemDropTest = /Drop (.*)/i.exec(text);
    if (currentItemDropTest) {
      let itemName = currentItemDropTest[1].trim();
      let foundItem = this.props.player!.inventory.filter(item => item.name === itemName);
      if (foundItem && foundItem.length === 1) {
          this.giveRoomItem(foundItem[0]);
      } else if (foundItem.length > 1){
        console.log(foundItem);
      }
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
      this.props.handleUserChatInput(`you exited the room via ${direction} exit.`)
    }
  }

  getCurrentRoom = (rooms: Map<string, Room>, location: [number, number]) => {
    return rooms.get(location.toString());
  }
  /**
   * method used by room inventory to give player item/ drop item into player inventory, accepts item as argument
   */
  givePlayerItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    return this.props.addItem(item, currentRoom);
  }
  /**
   * method used by player inventory to drop item and give it to the rooms iventory, accepts item as argument. 
   */
  giveRoomItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    return this.props.removeItem(item, currentRoom);
  }

  componentDidMount() {
    this.props.setPlayerLocation(this.props.dungeon!.map.startingRoom());
    this.message$.subscribe(this.logic);
  }

  public render(): JSX.Element {

    let { player, message, dungeon } = this.props;
    let currentRoom = this.getCurrentRoom(this.props.dungeon.rooms, this.props.player.location);
    let divStyle = currentRoom ? {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: currentRoom!.description,
      margin: 5,
      padding: 15
    } : {};

    let description = currentRoom ? currentRoom.description: "Mjolnir Room"
    return (
      <div className={'parent'} style={divStyle}>
        <h4 className="center title">{description}</h4>

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
          messageList={message}
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
  handleUserChatInput,
  clearChatOutput,
  setPlayerLocation,
  addItem,
  removeItem, 
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return {
    message: state.message,
    player: state.player,
    dungeon: state.dungeon
  };
};

export default connect<StoreState, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);
