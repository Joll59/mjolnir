import { getRandomInt } from '../helpers/random';

// type Doorway2 = [number, number, number, number];

interface Doorway {
    from: [number, number];
    to: [number, number];
}

type Direction = 'N' | 'S' | 'E' | 'W';
enum DirectionRand {N, S, E, W}

class Doorways {

    private doorways: Doorway[] = [];

    getDoorWays = () => this.doorways;
    
    isDoorway = (room: [number, number], direction: Direction): boolean => {
        let normDoor = this.normalizeDoorway({
            from: room, 
            to: this.toFromDirection(room, direction)
        });
        return this.doorways.find(
            doorway => 
            this.equals(doorway.from, normDoor.from) && 
            this.equals(normDoor.to, doorway.to)) !== undefined;
    }
    // isDoorway([3, 2], 'N');
    // to: is generated based on the direction parameter
    // addDoorway(room, S)
    addDoorway = (room: [number, number], direction: Direction) => 
        this.doorways.push(this.normalizeDoorway({
            from: room, 
            to: this.toFromDirection(room, direction)
        })
    ) 

    equals = (array1: number[], array2: number[]) => {
            // if the either array is a falsy value, return
            if (!array1 || !array2) {
                return false;
            }
        
            // compare lengths - can save a lot of time 
            if (array1.length !== array2.length) {
                return false;
            }
        
            for (var i = 0, l = array1.length; i < l; i++) {
                 if (array1[i] !== array2[i]) { 
                    return false;   
                }           
            }       
            return true;
        }

    private toFromDirection = (room: [number, number], direction: Direction): [number, number] => {
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

    private normalizeDoorway (
        doorway: Doorway
    ) {
        return (doorway.from[1] > doorway.to[1] || doorway.from[0] > doorway.to[0])
            ? {from: doorway.to, to: doorway.from}
            : doorway;
    }
}

const createMap = ( numberOfRooms: number, mapGridSize: number[]) => {

    let counter = 0;
    let mapPath = new Doorways();

    let room: [number, number] = [getRandomInt(0, mapGridSize[0] - 1), getRandomInt(0, mapGridSize[1] - 1)];

    const onGrid = (roomToCheck: [number, number]): boolean => {
        return roomToCheck[0] < mapGridSize[0] && roomToCheck[1] < mapGridSize[1];
    };

    while (counter < numberOfRooms && onGrid(room)) {
        let direction = <Direction> DirectionRand[getRandomInt(0, 3)];

        // console.log(direction);
        // console.log(counter);
        // console.log(mapPath.isDoorway(room, direction));
        
        if (!mapPath.isDoorway(room, direction)) {
            counter++;
            mapPath.addDoorway(room, direction);
            if (counter > 1 ) {
                room = mapPath.getDoorWays()[getRandomInt(0, mapPath.getDoorWays().length - 1)].from;
            }
            room = mapPath.getDoorWays()[mapPath.getDoorWays().length - 1].to;
        }
        // mapPath.getDoorWays().forEach(element => {
        //     console.log('doorway', element);
        // });
    }

    return mapPath;
};

// createMap(15, [10, 10]);
// .getDoorWays().forEach(element => {
//     console.log('doorway', element);
// });

// console.log(typeof(DirectionRand[getRandomInt(0, 3)]));