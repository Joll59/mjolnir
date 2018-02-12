import { getRandomInt } from '../helpers/random';
import { Item, ItemType, Entity, Armor, Weapon } from '../types'; 

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
  location: [number, number];

  constructor(
    name: string= 'New Player', 
    type: string = 'Player', 
    health: number= getRandomInt(0, 250), 
    strength: number= getRandomInt(10, 120)
  ) {
    this.name = name;
    this.type = type;
    this.health = health;
    this.initialHealth = this.health;
    this.strength = strength;
    this.experience = 0;
    this.level = 0;
    this.levelUpThreshold = 100;
    this.weapon = {
      id: 1, 
      power: Math.floor(Math.random() * 10) + 5, 
      type: ItemType.weapon, 
      name: 'fists'
    };
    this.armor = {
      id: 1 , 
      protection: getRandomInt(0, 5), 
      type: ItemType.armor, 
      name : 'basic_clothes'
    }; 
    this.inventory = [this.weapon, this.armor];
    // this.setLocation();
  }

  // attack = (enemy: Entity) => {
  //  arg here should be another entity with the receivedDamage function below.
  //   const damage = getRandomInt(this.strength / 2, this.weapon.power + this.strength) - this.armor.protection;
  //   enemy.receiveDamage(damage);
  //   return this.gainExperience(damage)
  // }
  
  receiveDamage = (damage: number) => {
    this.health -= damage;
  }

  useItem = (item: Item & Weapon & Armor) => {
    switch (item.type) {
      case ItemType.armor:
        this.armor = item;
        break;
      case ItemType.weapon:
        this.weapon = item;
        break;
      case ItemType.health:
        this.health += item.power;
        break;  
      default:
        break;
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
