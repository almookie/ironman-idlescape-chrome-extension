export enum SocketMessage {
    UpdatePlayer = 'update player',
    UpdateInventory = 'update inventory'
}

export enum updatePlayerKeys {
    All = 'all',
    Skills = 'skills'
}

export type updatePlayer = 
    | updatePlayerAll
    | updatePlayerSkills;

export interface updatePlayerSkills {
    // "id": any;
    // "level": any;
    // "experience": any;
    // "lastReceivedExperience": any;
    // "masteryId": any;
    // "masteryLevel": any;
    // "masteryExperience": any;
    // "masteryLastReceivedExperience": any;
}

export interface updatePlayerAll {
    "stockpile": InventoryItem[];


    // "created": any;
    // "id": any;
    // "donated": any;
    // "username": any;
    // "online": any;
    // "loggedOut": any;
    // "league": any;
    // "accountId": any;
    // "2fa_secret": any;
    // "2fa_enabled": any;
    // "claimed": any;
    // "email": any;
    // "verifiedEmail": any;
    // "settings": any;
    // "inventory_ids": any;
    // "vault": any;
    // "equipment": any;
    // "cookingPot": any;

    // // TODO: Can probably use this for other items, declare an interface somewhere
    // "combatInventory": Array<{
    //     id: number,
    //     inventory_item_id: number,
    //     name: string,
    //     itemID: number,
    //     stackSize: number,
    // }>;
    // "toolbelt": any;
    // "chatChannels": any;
    // "talismans": any;
    // "farming": any;
    // "blockList": any;
    // "lockouts": any;
    // "tradeban": any;
    // "tradebanReason": any;
    // "muted": any;
    // "mutedReason": any;
    // "ban": any;
    // "banReason": any;
    // "buffs": any;
    // "combatBuffs": any;
    // "actionQue": any;
    // "easterCodes": any;
    // "eliteChallenges": any;
    // "statistics": any;
    // "skills": any;
    // "toolBoosts": any;
    // "powerMultipliers": any;
    // "combatStats": any;
    // "activeEnchantments": any;
    // "accountStatus": any;
}

export interface InventoryItem {    
    itemID: number,
    stackSize: number,
    name: string,
    id: number,
    inventory_item_id: number,
}