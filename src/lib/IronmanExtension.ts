import { Player, PlayerUpdate } from './player/Player';
import { SocketMessage } from './utilities/SocketSniffer';

export class IronmanExtension {
    player: Player;
    messageHandlers: { [handler: string]: (payload: {}) => any };

    constructor() {
        this.createMessageHandlers();
    }    

    /**
     * Creates all message handlers required by this extension to match messages received from the server that we are interested in
     */
    createMessageHandlers() {
        this.messageHandlers = {
            [SocketMessage.UpdatePlayer]: (payload: { portion: string | [string, string], value: {} }) => {
                const portion = payload.portion;
                const value = payload.value;

                if(portion == PlayerUpdate.All) {

                    // TODO pass values to this instantiation
                    this.player = new Player();
                
                /**
                 * Don't update player until we've been passed the entire player data.
                 * If we have, send individual updates to the player object
                 */
                } else if(typeof this.player !== 'undefined' && Array.isArray(portion)) {
                    const [category, type] = portion;

                    // TODO: add other player update types if they exist
                    switch (category) {
                        case PlayerUpdate.Skills:
                            this.player.updateSkill(type, value);
                            break;                    
                        default:
                            break;
                    }
                }
            }
        };
    }

    /**
     * Checks if values required for the extension to function are loaded, such as player, stockpile, etc.
     */
    isLoaded() {
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
                    console.log(data);

                    const [message, payload] = data;                    
                    if(handlers.hasOwnProperty(message)) {
                        handlers[message](payload);
                    }
                }
            }
        }
    }
}