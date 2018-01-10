export interface StoreState {
    item: Item;
    description: string;
}

interface Item {
    type: string;
}