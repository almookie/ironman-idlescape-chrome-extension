import { Inventory } from './Inventory';

export class Player {
    private _inventory: Inventory;
    constructor(inventory: Inventory) { this._inventory = inventory; }        
    public get inventory() : Inventory { return this._inventory; }
    private set inventory(inventory : Inventory) { this._inventory = inventory; }    
}