import { getRandomInt, arrayEquals } from '../helpers/random';
import { Direction } from '../types';

interface Doorway {
    from: [number, number];
    to: [number, number];
}

enum DirectionEnum { N = 1, S, E, W }

export class Doorways {

    private doorways: Doorway[] = [];
    private mapSize: [number, number] = [10, 10];

    constructor(maxRoomCount: number = 15, mapSize: [number, number]) {
        this.mapSize = mapSize;
        if (maxRoomCount < 1) {
            maxRoomCount = 5;
        }

        if (maxRoomCount === 1) {
            mapSize = [0, 0];
        }

        const startingRoom: [number, number] = [
            getRandomInt(1, this.mapSize[0] - 1),
            getRandomInt(1, this.mapSize[1] - 1)
        ] || [0, 0];

        // let counter = 0;

        // let gridArea = mapGridSize[1] + 1 * mapGridSize[0] + 1;

        // FIXME: recursive method call. not perfect!
        this.createDoorways(maxRoomCount - 1, startingRoom);

        // let room: [number, number] = startingRoom;

        // const onGrid = (roomFrom: [number, number], direction: Direction): boolean => {
        //         // FIXME: this function needs access to set the starting room currently fix that. 

        //     let roomTo = this.roomToFromDirection(roomFrom, direction);
        //     if (roomFrom[0] < 0 ||
        //         roomFrom[1] < 0 ||
        //         roomFrom[0] > this.mapGridSize[0]-1 ||
        //         roomFrom[1] > this.mapGridSize[1]-1
        //     ) {
        //         room = startingRoom;
        //         return false;
        //     } else if (roomTo[0] < 0 ||
        //         roomTo[1] < 0 ||
        //         roomTo[0] > this.mapGridSize[0]-1 ||
        //         roomTo[1] > this.mapGridSize[1]-1
        //     ) {
        //         room = startingRoom;
        //         return false;
        //     }

        //     return true;
        // };

        // while (counter <= gridArea && this.numberOfDoorways() <= roomCount) {

        //     let direction = <Direction> DirectionEnum[getRandomInt(1, 4)];

        //     if (!this.isDoorway(room, direction) && onGrid(room, direction)) {

        //         this.addDoorway(room, direction);

        //         if (this.numberOfDoorways() > 2) {
        //             let randomRoom = this.randomDoorway();
        //             let roomRandomizer = [randomRoom.from, randomRoom.to];
        //             // room = randomRoom.from;
        //             room = roomRandomizer[getRandomInt(0, 1)];
        //         }
        //         room = this.lastDoorway().to;
        //     }
        //     counter++;
        // }
    }

    possibleExits = (room: [number, number]) => {
        return this.getConnectedDoorways(room).map(
            doorway => {
                let direction: string = '';
                if (arrayEquals(doorway.to, room)) {
                    // run logic against doorway.from
                    if (doorway.from[1] === room[1] - 1) { 
                        direction = 'N'; 
                    }
                    if (doorway.from[1] === room[1] + 1) { direction = 'S'; }
                    if (doorway.from[0] === room[0] - 1) { direction = 'W'; }
                    if (doorway.from[0] === room[0] + 1) { direction = 'E'; }
                    return direction;
                } else {
                    // run logic against doorway.to
                    if (doorway.to[1] === room[1] - 1) { direction = 'N'; }
                    if (doorway.to[1] === room[1] + 1) { direction = 'S'; }
                    if (doorway.to[0] === room[0] - 1) { direction = 'W'; }
                    if (doorway.to[0] === room[0] + 1) { direction = 'E'; }
                    return direction;
                }
            }
        );
    }
    /**
     * method to return coordinates of the first room in generated doorways or return origin if algorithm fails. 
     */
    startingRoom = () => {
        if (this.doorways[0]) {
            return this.doorways[0].from;
        }
        return <[number, number]> [0, 0];
    }

    /**
     * returns the expected room(coordinates) from the current room provided and the direction of movement.
     * @param room x,y coordinate of a room e.g. [0,0]
     * @param direction: direction you want to check: N,W,S,E
     */
    roomToFromDirection = (room: [number, number], direction: Direction): [number, number] => {
        switch (direction) {
            case 'S':
                return [room[0], room[1] + 1];
            case 'N':
                return [room[0], room[1] - 1];
            case 'E':
                return [room[0] + 1, room[1]];
            case 'W':
                return [room[0] - 1, room[1]];
            default:
                return room;
        }
    }

    /**
     * a method when given a room coordinate and a direction will check if there a doorway there.
     * @param room: x,y coordinate of a room e.g. [0,0]
     * @param direction: direction you want to check: N,W,S,E
     */
    isDoorway = (room: [number, number], direction: Direction): boolean => {
        let normDoor = this.normalizeDoorway({
            from: room,
            to: this.roomToFromDirection(room, direction)
        });
        return this.doorways.find(
            doorway =>
                arrayEquals(doorway.from, normDoor.from) &&
                arrayEquals(normDoor.to, doorway.to)) !== undefined;
    }
    
    /**
     * a method that returns the rooms that are available for exploration on the map.
     */
    getConnectedRooms = (): [number, number][] => {
        let roomCollection: [number, number][] = [];

        const roomExists = (room: [number, number]): boolean => {
            if (roomCollection.find(currentRoom => arrayEquals(currentRoom, room)) === undefined) {
                return false; 
            }
            return true; 
        };

        this.doorways.forEach(doorway => {
            if (!roomExists(doorway.from)) {
                roomCollection.push(doorway.from);
            }  
            if (!roomExists(doorway.to)) {
                roomCollection.push(doorway.to);
            }
        });
        return roomCollection;
    }

    private getConnectedDoorways = (room: [number, number]) => {
        return this.doorways.filter(doorway =>
            arrayEquals(doorway.to, room) || arrayEquals(doorway.from, room));
        }

    // FIXME: complete recursive solution     
    private createDoorways = (roomCount: number, room: [number, number]) => {

        const validDirections = [];

        for (let direction in DirectionEnum) {
            if (!Number(direction) &&
                this.isDoorwayonGrid(room, <Direction> direction) &&
                !this.isDoorway(room, <Direction> direction)
            ) {
                validDirections.push(direction);
            } 
        }

        if (validDirections.length < 1){
            return 
        }

        const randomLoop = Math.floor(Math.random() * validDirections.length);
        console.log('Value of RandomLoop::::', randomLoop);
        const removeAmount = getRandomInt(1, validDirections.length);

        let availableDirection = validDirections.splice(randomLoop, removeAmount);

           if (availableDirection.length < 1)
           {    
               let test = 1 + 1 ;
               console.log('breakpoint', test)
           } 
           

        // const availableDirection = [];
        for (let i = 0; i < randomLoop; i++) {
            const randomIndex = Math.floor(Math.random() * validDirections.length);
            availableDirection.push(validDirections.splice(randomIndex, 1)[0]);
        }

        for (let direction of availableDirection) {
            if (this.numberOfDoorways() >= roomCount) {
                return;
            }
            if (this.isDoorwayonGrid(room, <Direction> direction) &&
            !this.isDoorway(room, <Direction> direction)) {
                this.addDoorway(room, <Direction> direction);
                room = this.roomToFromDirection(room, <Direction> direction);
                this.createDoorways(roomCount, room);
            }
        }
    }

    private isDoorwayonGrid = (roomFrom: [number, number], direction: Direction): boolean => {

        let roomTo = this.roomToFromDirection(roomFrom, direction);
        if (roomFrom[0] < 0 ||
            roomFrom[1] < 0 ||
            roomFrom[0] > this.mapSize[0] - 1 ||
            roomFrom[1] > this.mapSize[1] - 1
        ) {
            return false;
        } else if (roomTo[0] < 0 ||
            roomTo[1] < 0 ||
            roomTo[0] > this.mapSize[0] - 1 ||
            roomTo[1] > this.mapSize[1] - 1
        ) {
            return false;
        }
        return true;
    }

    private numberOfDoorways = () => this.doorways.length;
    
    // private lastDoorway = () => this.doorways[this.numberOfDoorways() - 1];
    // private randomDoorway = () => this.doorways[getRandomInt(0, this.numberOfDoorways() - 1)];
    
    private addDoorway = (room: [number, number], direction: Direction) =>
    this.doorways.push(this.normalizeDoorway({
            from: room,
            to: this.roomToFromDirection(room, direction)
        })
    )
    
    private normalizeDoorway(
        doorway: Doorway
    ) {
        return (doorway.from[1] > doorway.to[1] || doorway.from[0] > doorway.to[0])
        ? { from: doorway.to, to: doorway.from }
        : doorway;
    }
}
