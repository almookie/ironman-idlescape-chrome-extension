export class Inventory {
    constructor(
        public stockpile: SubInventory,
        // public vault: SubInventory,
    ) {}

    /**
     * Returns a list of all the items in the inventory by the given IDs. 
     * 
     * @param itemIDs A list of item IDs for the items we're interested in
     */
    public getItems(itemIDs: number | number[]): InventoryItem[] {
        const _itemIDs = Array.isArray(itemIDs) ? itemIDs : [itemIDs];

        // TODO: For now only return items from the stockpile, might need to also retrieve items from other inventories in the future, e.g. for enchanting
        // TODO: Probably more efficient to do this through a map, initialising the map when inventories are first initialised
        return this.stockpile.items.filter(item => { return _itemIDs.includes(item.itemID) });
    }
}

export class SubInventory {
    private _items: InventoryItem[];    
    constructor(items: InventoryItem[]) { this._items = items; }    
    public get items() : InventoryItem[] { return this._items; }    
    private set items(items : InventoryItem[]) { this._items = items; }
}

// TODO: Maybe have other types of inventory items extend this class?
export class InventoryItem {
    public static ITEM_ID_HEAT = 2;
    private _stackSize: number;

    constructor(
        public itemID: number,
        stackSize: number,
    ) { 
        this._stackSize = stackSize;
    }    
    public add(size: number) { this._stackSize += size }
    public remove(size: number) { this._stackSize -= size }
    public set stackSize(stackSize : number) { this._stackSize = stackSize; }
    public get stackSize() : number { return this._stackSize; }        
}