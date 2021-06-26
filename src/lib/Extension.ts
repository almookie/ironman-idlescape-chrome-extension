import { CraftingCalculator } from './calculators/crafting/Crafting';
import { ItemRecipes, ItemData, ItemDataCraftable, ItemIDs } from './utilities/ItemRaw';
import { Inventory, SubInventory, InventoryItem as Item } from './player/Inventory';
import { Player } from './player/Player';
import * as Raw from './utilities/MessageRaw';
import { UI } from './ui/UI';

export class Extension {
    uiHandler: UI;
    player: Player;
    messageHandlers: { [handler: string]: (payload: {}) => any };

    constructor() {
        this.createMessageHandlers();
        this.uiHandler = new UI();
    }    

    /**
     * Creates all message handlers required by this extension to match messages received from the server that we are interested in
     */
    private createMessageHandlers() {
        this.messageHandlers = {

            // Handler for updating any player data
            [Raw.SocketMessage.UpdatePlayer]: (payload: { 
                portion: string | [string, string],
                value: Raw.updatePlayer
            }) => {
                const portion = payload.portion;
                const value = payload.value;

                // Initialisation case, when this key is seen the extension can properly be loaded
                if(portion == Raw.updatePlayerKeys.All) {
                    this.initialisePlayerData(value as Raw.updatePlayerAll);
                    this.buildExtension();
                }

                // Don't handle player updates until all player data is sent
                if(typeof this.player === 'undefined') return;

                // TODO: Handle other update cases
            }
        };
    }

    private initialisePlayerData(value: Raw.updatePlayerAll) {
        console.log(value);
        const stockpile: SubInventory = new SubInventory(value.stockpile.map(rawItem => {
            return new Item(rawItem.itemID, rawItem.stackSize);
        }));
        const inventory: Inventory = new Inventory(stockpile);
        this.player = new Player(inventory);
    }

    /**
     * Second initialiser for the extension, called once DOM is loaded and all player data is received 
     */
    private buildExtension() {
        
        // TODO: Rename?
        const extensionCategory: HTMLDivElement = this.uiHandler.createSidebarMenuCategory('Tools');
        const calculatorsButton: HTMLDivElement = this.uiHandler.createSidebarMenuLink('Calculators', extensionCategory);
        // this.uiHandler.popupOnClick(calculatorsButton, )
    }

    /**
     * Checks if values required for the extension to function are loaded, such as player, stockpile, etc.
     */
    public isLoaded() {
        return typeof this.player !== 'undefined';
    }

    /**
     * 
     * @returns     Listener callback to run on receiving socket messages
     */
    get socketListener() {
        return (rawMessage: MessageEvent) => {                  
            const handlers = this.messageHandlers;
            let strippedMessage = rawMessage.data.replace(/^[0-9]*/g, '');
            if(strippedMessage.length) {
                let data;

                try { 
                    data = JSON.parse(strippedMessage);
                } catch (e) {}

                if(Array.isArray(data) && data.length) {
                    // console.log(data);

                    const [message, payload] = data;                    
                    if(handlers.hasOwnProperty(message)) {
                        handlers[message](payload);
                    }
                }
            }
        }
    }
}

