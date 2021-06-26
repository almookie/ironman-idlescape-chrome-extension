import { InventoryItem as Item } from '../../player/Inventory';
import { ItemRecipe, ItemDataCraftable, ItemRecipes } from '../../utilities/ItemRaw';
import { Skill } from '../../utilities/Skills';

// TODO: Add these to a calculator
        // // TODO: Build react canvas
        // // TODO: Add calculators        

        // // --------------------------
        // //  Temp to just get started
        // // --------------------------
        
        // // Craftable Items
        // // TODO: get from the UI
        // let recipeIDs: number[] = [
        //     620,    // Sapphire Ring
        //     706,    // Pyre Yew Log
        //     1054,   // Adamantite Full Helm
        //     2014,   // Ashes
        // ];

        // // Always include heat, it might be used even if the recipes don't require heat
        // let requiredInventoryItemIDs: number[] = [Item.ITEM_ID_HEAT];

        // // Retrieve all of our recipes and the items required for those recipes
        // const inventory = this.player.inventory;
        // let itemsToCraft: ItemDataCraftable[] = [];
        // let inventoryItems: { [itemID: number]: Item } = {};

        // // Base recipes
        // recipeIDs.forEach(itemID => { 
        //     const item = ItemRecipes.getCraftableRecipes(itemID);
        //     itemsToCraft.push(item);
        //     const _recipes = Array.isArray(item.requiredResources) ? item.requiredResources : [item.requiredResources];
        //     _recipes.forEach(recipe => {
        //         Object.keys(recipe).forEach(requiredItemID => {
        //             if(requiredInventoryItemIDs.indexOf(Number(requiredItemID)) === -1) {
        //                 requiredInventoryItemIDs.push(Number(requiredItemID));
        //             }
        //         })
        //     });
        // });

        // // Sub-recipes
        // const subItemsToCraft: { [itemID: number]: ItemData } = {};
        // itemsToCraft.forEach(item => {
        //     const recipes = Array.isArray(item.requiredResources) ? item.requiredResources : [item.requiredResources];
        //     recipes.forEach(recipe => {
        //         Object.keys(recipe).forEach(subItemID => {
        //             const _subItemID: number = Number(subItemID);

        //             if(!(_subItemID in subItemsToCraft)) {
        //                 const subRecipe: ItemDataCraftable = ItemRecipes.getCraftableRecipes(_subItemID);
        //                 if(typeof subRecipe !== 'undefined' && 'requiredResources' in subRecipe) subItemsToCraft[_subItemID] = subRecipe; 
        //             }
        //         })
        //     });
        // });

        // inventory.getItems(requiredInventoryItemIDs).forEach(item => inventoryItems[item.itemID] = item);

        // // Do calculations
        // const output = CraftingCalculator.simulate(
        //     inventoryItems,
        //     itemsToCraft,
        //     subItemsToCraft,
        //     { 
        //         infiniteHeat: true,
        //         intuitionBuff: true,
        //         sageberryBuff: true,
        //         craftingModifier: 0.88,
        //     }
        // );
        // console.log(output);

export class CraftingCalculator {

    /**
     * Simulates crafting selected materials with given parameters and stores the results
     */
    public static simulate(
        items: { [itemID: number]: Item }, 
        itemsToCraft: ItemDataCraftable[],
        subRecipes: { [itemID: number]: ItemDataCraftable },
        settings: { 
            intuitionBuff?: boolean, 
            sageberryBuff?: boolean,
            infiniteHeat?: boolean,
            craftingModifier?: number,
        }
    ) {
        // Manage setting overrides and bonuses
        if('infiniteHeat' in settings && settings['infiniteHeat']) {
            items[Item.ITEM_ID_HEAT].stackSize = Number.MAX_SAFE_INTEGER;
        }
        let craftingModifier = 'craftingModifier' in settings ? settings['craftingModifier'] : 1;
        let experienceModifier = 1;

        // TODO: get rid of magic numbers
        if('intuitionBuff' in settings && settings['intuitionBuff']) experienceModifier += 0.2;
        if('sageberryBuff' in settings && settings['sageberryBuff']) experienceModifier += 0.2;

        // TODO: Replace with Output class
        let crafts: {
            [itemID: number]: {
                name: string,
                crafted: number,
                experience: number,
            }
        } = {}

        // Craft each item in order that they've been passed
        itemsToCraft.forEach(itemData => {
            crafts[itemData.id] = { name: itemData.name, crafted: 0, experience: 0 }

            // Some items have multiple recipes, we need to check each one
            const recipes = Array.isArray(itemData.requiredResources) ? itemData.requiredResources : [itemData.requiredResources];   
            recipes.forEach(recipe => {

                const maximumCrafts: number = this.getMaximumCrafts(items, recipe, subRecipes, craftingModifier);        
            });
        });

        return crafts;
    }

    private static getMaximumCrafts(
        items: { [itemID: number]: Item },
        recipe: ItemRecipe,
        subRecipes: { [itemID: number]: ItemDataCraftable },
        craftingModifier: number,
    ): number {

        let maximumCrafts = Number.MAX_SAFE_INTEGER;

        // First pass to see the upper limit of resources required that don't have a recipe, 
        // if they're too low we don't need to do a second pass
        Object.keys(recipe).forEach(requiredItemID => {
            const requiredItem: Item = items[Number(requiredItemID)];
            const costPerCraft = Math.ceil(recipe[requiredItemID] * craftingModifier);
            const itemCrafts = Math.floor(requiredItem.stackSize / costPerCraft);

            maximumCrafts = itemCrafts < maximumCrafts ? itemCrafts : maximumCrafts;
        });



        Object.keys(recipe).forEach(requiredItemID => {
            const requiredItem: Item = items[Number(requiredItemID)];
            const costPerCraft = Math.ceil(recipe[requiredItemID] * craftingModifier);
            const itemCrafts = Math.floor(requiredItem.stackSize / costPerCraft);

            maximumCrafts = itemCrafts < maximumCrafts ? itemCrafts : maximumCrafts;
        });

        return maximumCrafts;
    }
}

// TODO: Makes this a global interface to use for other calculators
class Output {
    constructor() {}
}