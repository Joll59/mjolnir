import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import 'isomorphic-fetch';
import { initializeIcons } from '@uifabric/icons';
import * as Rx from 'rxjs';

import { removeItem, addItem, setPlayerLocation } from './actions/player';
import { handleUserChatInput } from './actions/user';
import { Chat, Gamemap, RoomComponent, PlayerComponent, Compass } from './components';
import { arrayEquals } from './helpers';
import { Direction, Item, Room, StoreState } from './types';

initializeIcons();

interface DispatchProps {
  handleUserChatInput: (text: string) => {}; /* currently useles method, was designed to generate chat history*/
  addItem: (Item: Item, room: Room | undefined) => {};
  removeItem: (Item: Item, room: Room | undefined) => {};
  setPlayerLocation: (location: [number, number]) => {};
}

type Props = StoreState & DispatchProps;

/** 
 * top level component.
 */
class App extends React.Component<Props, StoreState> {


  /**
   * method that is my current basic bot logic. 
   */
  logic = (text: string) => {
    let currentExitTest = /Exit(.*)/i.exec(text);
    if (currentExitTest) {
      let result = currentExitTest[1].trim().toLowerCase().split(' ');
      let direction = result[result.length - 1][0].toUpperCase() as Direction;
      let { location } = this.props.player!;
      if (this.props.gameMap!.map.isDoorway(location, direction)) {
        let nextRoom = this.props.gameMap!.map.roomToFromDirection(location, direction);
        this.props.setPlayerLocation(nextRoom);
      }
    }

    let currentItemPickUpTest = /Pick Up(.*)/i.exec(text);
    if (currentItemPickUpTest) {
      let itemName = currentItemPickUpTest[1].trim();
      let foundItem = this.getCurrentRoom()!.inventory.filter(item => item.name === itemName)
        foundItem && foundItem.length === 1 ? this.givePlayerItem(foundItem[0]) : this.itemLogicalRepercussion(foundItem);
    }

    let currentItemDropTest = /Drop(.*)/i.exec(text);
    if (currentItemDropTest) {
      let itemName = currentItemDropTest[1].trim();
      let foundItem = this.props.player!.inventory.filter(item => item.name === itemName)
      foundItem && foundItem.length === 1 ? this.giveRoomItem(foundItem[0]) : null;
    }
  }

  itemLogicalRepercussion = (items: Item[]) => {
    if(items.length === 0) {
      
    }
  }
  /**
   * method that accepts a direction which player will go. 
   */
  go = (direction: Direction) => {
    let { location } = this.props.player!;
    if (this.props.gameMap!.map.isDoorway(location, direction)) {
      let nextRoom = this.props.gameMap!.map.roomToFromDirection(location, direction);
      this.props.setPlayerLocation(nextRoom);
    }
  }

  /**
   * method returns the current room object.
   */
  getCurrentRoom = () => {
    return this.props.gameMap.rooms.find
      (room => arrayEquals(room.location, this.props.player.location));
  }
  /**
   * method used by room inventory to give player item/ drop item into player inventory, accepts item as argument
   */
  givePlayerItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom();
    return this.props.addItem(item, currentRoom);
  }
  /**
   * method used by player inventory to drop item and give it to the rooms iventory, accepts item as argument. 
   */
  giveRoomItem = (item: Item) => {
    let currentRoom = this.getCurrentRoom();
    return this.props.removeItem(item, currentRoom)
  }

  message$ = new Rx.Subject<string>();

  componentDidMount() {
    this.props.setPlayerLocation(this.props.gameMap!.map.startingRoom());
    this.message$.subscribe({ next: this.logic });
  }

  public render(): JSX.Element {

    let { player, message, gameMap } = this.props;
    let currentRoom = this.getCurrentRoom();
    let divStyle = currentRoom ? {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: currentRoom!.description,
      margin: 5,
      padding: 15
    } : {};
    // <h2 className="center">Mjolnir</h2>
    return (
      <div className={'parent'} style={divStyle}>

        <PlayerComponent
          player={player!}
          dropItem={this.giveRoomItem}
        />

        <RoomComponent
          playerPickUpItem={this.givePlayerItem}
          currentRoom={currentRoom}
        />

        <Gamemap
          grid={gameMap!.grid}
          mapPath={gameMap!.map}
          playerLocation={player!.location}
        />

        <Chat
          messageList={message.messageList}
          handleUserChatInput={this.message$}
        />

        <div id={'compass'}>
          {gameMap!.map.possibleExits(player!.location).map(
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
  setPlayerLocation,
  addItem,
  removeItem
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(actionCreator, dispatch);
};

const mapStateToProps = (state: StoreState) => {
  return {
    message:
      {
        ...state.message,
        messageList: state.message.messageList
      },
    player: state.player,
    gameMap: state.gameMap
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App as any);
