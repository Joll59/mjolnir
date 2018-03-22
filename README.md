# MJOLNIR - an experiment in state management between a web app and a bot

 __WIP idea__: a react app that can be controlled via conventional means, mouse,keyboard.... but also have an integrated bot with the same levels of control.

 __execution__: create a dungeon crawler game using the idea above.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Set Up

Clone down this repo.  
cd into proper directory. 

 `npm install`  
 `npm start`  
navigate to: `localhost://3000` 

## Playing the Game

- Navigation
    - click through using compass on upper left to navigate between rooms.
    - use the command `Exit` followed by a direction `north`, `south`, `east`, `west`, or even `up`, `down`, `left`, `right`.

- Interaction
    - click on items to transfer between player and room.
    - use command `pick up`, `drop` followed by item **`name`**.
        - _item name has to be spelled as shown_  e.g: `chocolateCoin` remains `chocolatecoin`, search is not not case sensitive.
        - item name collision is designed in.
            - if items share names and exist within the same scope, `inventory`, a new prompt appears.
                - click to make a choice from selection window or 
                - use commands `1st one`, `2nd`, `third`, `3`. (Note: `last` command not implemented).
                - or choose to keep both items and move on, in which case all previous commands outside of selection commands will be used.

- Winning the Game?
    - WIP
        - Not a FULLY working game yet(UPDATES TO FOLLOW)

## Feature PipeLine
    [ ] generated rooms (items, exits, walls) based on random description or room description (listing items, and exits) based on randomly generated room.  
    [ ] Improve Visuals
    [ ] Implement webChat using SDKv4 M2

### Contributors

[Yomi](https://github.com/joll59) -- [Bill](https://github.com/billba) -- [Tess](https://github.com/tessmichi)
