import { Stockpile } from './Stockpile';

export enum PlayerUpdate {
    All = 'all',
    Skills = 'skills'
}

export class Player {
    loaded: Boolean;
    stockpile: Stockpile;

    constructor() {
        this.loaded = false;
        this.stockpile = new Stockpile();
    }

    /**
     * Checks if data has been fully populated for the player yet
     * 
     * @returns true of all of the player data has been loaded, false otherwise
     */
    isLoaded() {
        return this.loaded;
    }
    
    // TODO: change 'type' to an enum of skills?
    updateSkill(type: string, value: {}) {}
}