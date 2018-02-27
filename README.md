# MJOLNIR - an experiment in state management between an app and a bot

 __WIP idea__: a react app that can be controlled via conventional means, mouse,keyboard.... but also have an integrated bot with the same levels of control.

 __execution__: create a dungeon crawler game using the idea above.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## TODO

(Currently using Jest and Chai, mocha can be implemented but mocha type definitions will conflict with jest type definitions)

- [ ] Testing
  - [ ] Write test for reducers
  - [ ] write tests for actions.

- [ ] LOGIC:
    - [ ] Review recursive call for creating doorways
    - [x] state management
      - [x] decide how to create rooms & find rooms.
      Choices:
        - create room when player enters and push room into rooms array
        - have the Doorways class create rooms with items based on created doorways, method returns a rooms array. (Leaning heavily towards this choice.)
        - something i haven't thought of yet.
      - [x] rooms array in state.
        - [x] create rooms with:
          - [x] inventory: an array of Item Objects.
          - [x] Location/ID: x,y coordinates
    - [ ] Player removes items from Room inventory.
      - [x] add item into player inventory from room inventory.
      - [ ] removing item from room inventory.
        - [ ] create a room Reducer
          - [ ] handles all room logic
      - [x] remove item from player inventory.

- [ ] GUI:
    - [ ] Improve Visuals
      - [ ] exit buttons should appear oriented to the direction they are pointing to. North exit should appear at top, East to right.
      - [ ] Display Items in Rooms.
        - [X] display room inventory.
        - [ ] display room description on entry.

- [ ] CUI:
    - [ ] Implement Webchat
    - [ ] chat panel should display information of player action.
      - [ ] pull data from state and display relevant context information for player action/room status.
        Example:
            - "player openned chest, the chest contains 2 items, a sword and shield"
            - "player arrived in room and is facing a dragon..."
            - "there are 3 exits in this room, N, S, W"