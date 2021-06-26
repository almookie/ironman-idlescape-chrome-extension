import ItemRecipesData from '../../data/items.json';
export enum ItemIDs {
    Heat = 2,
}

export class ItemRecipes {
    public static getCraftableRecipes(itemID: number): ItemDataCraftable {
        const itemRecipesData = ItemRecipesData as { [key: string] : ItemData };
        
        if(itemID.toString() in itemRecipesData) {
            return itemRecipesData[itemID.toString()] as ItemDataCraftable;
        } else {
            return undefined;
        }
    }
}

export interface ItemDataCraftable extends ItemData {
    craftingExperience?: number;
    requiredResources?: ItemRecipe | ItemRecipe[];
}

export interface ItemData {
    id: number;
    name?: any;

    // Possible values
    // craftingExperience?: any;
    // name?: any;
    // tradeable?: any;
    // extraTooltipInfo?: any;
    // itemImage?: any;
    // class?: any;
    // essence?: any;
    // value?: any;
    // heat?: number;
    // isBook?: any;
    // tags?: any;
    // level?: any;
    // experience?: any;
    // isIngredient?: any;
    // isFish?: any;
    // time?: any;
    // itemName?: any;
    // resourceImage?: any;
    // price?: any;
    // craftingLevel?: any;
    // requiredResources?: any;
    // craftingDescription?: any;
    // category?: any;
    // farmingExperience?: any;
    // seedHeight?: any;
    // seedWidth?: any;
    // yield?: any;
    // plantImage?: any;
    // seedMaxHeight?: any;
    // seedMaxWidth?: any;
    // skill?: any;
    // loot?: any;
    // nodeName?: any;
    // nodeImage?: any;
    // talisman?: any;
    // activeMessage?: any;
    // actionButton?: any;
    // slot?: any;
    // enchantmentTier?: any;
    // augmentationCost?: any;
    // requiredLevel?: any;
    // tool?: any;
    // enchantable?: any;
    // augmentationStats?: any;
    // forcedEnchant?: any;
    // forcedEnchantAmount?: any;
    // overwriteEnchant?: any;
    // attackBonus?: any;
    // defenseBonus?: any;
    // strengthBonus?: any;
    // description?: any;
    // canBeOpened?: any;
    // style?: any;
    // oneHanded?: any;
    // attackSpeed?: any;
    // itemIcon?: any;
    // visual?: any;
    // isDaggers?: any;
    // twoSided?: any;
    // enchant?: any;
    // enchantmentID?: any;
    // categories?: any;
    // baseSuccessChance?: any;
    // enchantName?: any;
    // skillIcon?: any;
    // hidden?: any;
    // enchantment?: any;
    // isEdible?: any;
    // healing?: any;
    // isChampScroll?: any;
    // champEncounter?: any;
    // maxAugLevel?: any;
}

export interface ItemRecipe {
    [ingredient: string]: number
}