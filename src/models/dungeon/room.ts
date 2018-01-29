import { Entity } from '../player/Player'; // this probably needs to move to a set location for all types. 

export default class Room {
    entties: Array<Entity>;

    constructor(entities: Entity[] /* takes an array of objects one of which has to be a door maybe*/) {
        this.entties = entities;
    }

    render() {
        this.entties.map(entity => {
            return entity;
            /// need some logic to render each object/property. 
        });
    }

}