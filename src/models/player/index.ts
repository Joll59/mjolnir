import { getRandomInt } from '../../helpers/random';

enum ItemType {
  weapon,
  armor,
  chest,
  key,
}

interface Item {
    id: number;
    type: ItemType;
    name: string;
    description?: string;
    equipable?: boolean;
    questItem?: boolean;
    action?: string;
}

interface Weapon extends Item {
    power: number;
}

interface Armor extends Item {
  protection: number;
}

export interface Entity {
  name?: string;
  type?: string;
  level?: number;
  inventory?: Item[]; // should all entities have an inventory?
  weapon?: Weapon; 
  armor?: Armor;
  location: { x: number, y: number, z?: number };
}

class Player implements Entity {
  name: string;
  type: string;
  health: number;
  initialHealth: number;
  strength: number;
  experience: number;
  level: number;
  inventory: Item[];
  weapon: Weapon; 
  // consider individual interfaces for weapon and armor both extending item, so you can use power/protection.
  armor: Armor;
  levelUpThreshold: number;
  location: { x: number, y: number };

  constructor(name: string= 'New Player', type: string = 'Player', health?: number, strength?: number) {
    this.name = name;
    this.type = type;
    this.health = health || getRandomInt(0, 250);
    this.initialHealth = this.health;
    this.strength = strength || getRandomInt(10, 120);
    this.experience = 0;
    this.level = 0;
    this.levelUpThreshold = 100;
    this.weapon = {
      id: 1, power: Math.floor(Math.random() * 10) + 5, type: ItemType.weapon, name: 'fists', equipable: true};
    this.armor = {
      id: 1 , protection: getRandomInt(0, 5), type: ItemType.armor, name : 'basic_clothes', equipable: true}; 
    this.inventory = [this.weapon, this.armor];
    this.setLocation();
  }

  pickUp = (item: Item) => {
    this.inventory.push(item);
  }

  setLocation(x: number = 0, y: number= 0) {
    this.location = { x, y };
  }

  // attack = (enemy: Entity) => {
  //   // arg here should be another entity with the receivedDamage function below.
  //   const damage = getRandomInt(this.strength / 2, this.weapon.power + this.strength) - this.armor.protection;
  //   enemy.receiveDamage(damage);
  //   return {
  //     who: this,
  //     enemy,
  //     damage,
  //     opponentDead: enemy.isDead(),
  //     levelUp: this.gainExperience(damage),
  //   };
  // }
  
  receiveDamage = (damage: number) => {
    this.health -= damage;
  }

  equip = (item: Weapon & Armor) => {
    if (item.equipable) {
      if (item.type === ItemType.armor) {
        this.armor = item;
      } else if (item.type === ItemType.weapon) {
        this.weapon = item;
      }
    }
  }

  isDead = (): boolean => {
    return this.health <= 0 ? true : false;
  }

  // needs a bit of rework, but its close. 
  gainExperience = (experience: number) => {
    this.experience += getRandomInt(experience / 2, experience );
    if (this.experience > this.levelUpThreshold) {
      this.level += 1;
      this.health =
        this.initialHealth +
        getRandomInt(10 + this.level / 2, 30 + this.level / 2);
      this.initialHealth = this.health;
      this.strength += getRandomInt(5 + this.level / 2, 15 + this.level / 2);
      this.experience %= this.levelUpThreshold;
      this.levelUpThreshold *= 1.5;
      return true;
    }
    return false;
  }
}

export default Player;
