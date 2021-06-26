export class SocketSniffer {
    socket: WebSocket;
    messageListeners: Function[];

    constructor() {
        this.messageListeners = [];
    }

    /**
     * Attaches our SocketSniffer to the default WebSocket in order to retrieve the instance we need for reading messages
     */
    attach() {  

        /**
         * "Attaches" the sniffer to the default WebSocket 'send' prototype in order to retrieve the WebSocket instance that we want.
         * The attach() function is designed this way in order to maximise compatability with other scripts and extensions.
         */

        // @ts-ignore
        if(typeof WebSocket.prototype._send === 'undefined'){

            // @ts-ignore
            WebSocket.prototype._send = WebSocket.prototype.send;

            WebSocket.prototype.send = function(data) {
                this._send(data);    

                // @ts-ignore
                if(typeof window.IdlescapeSocket === 'undefined') {
                    
                    // @ts-ignore
                    window.IdlescapeSocket = this;
                    this.send = this._send;
                }
            }
        }

    }

    /**
     * Adds a given function to the list of listeners to call on the socket message event
     * 
     * @param messageListener A listener function that takes a raw message and process it
     */
    addMessageListener(messageListener: (rawMessage: MessageEvent) => any) {
        this.messageListeners.push(messageListener);
    }

    /**
     * @returns true of the socket has been captured, false otherwise
     */
    isAttached():Boolean {
        
        // @ts-ignore
        if(typeof window.IdlescapeSocket === 'undefined') return false;

        // @ts-ignore
        this.socket = window.IdlescapeSocket;
        return true;
    }

    /**
     * Actually binds the stored message listeners to the WebSocket 'message' event. Should only be called once isAttached() returns 
     * true to indicate that the socket is available and events can be bound
     */
    bindMessageListeners() {
        this.socket.addEventListener('message', (rawMessage) => { this.callMessageListeners(rawMessage) });
    }

    /**
     * Calls each function in this.messageListeners and passes the received MessageEvent
     * 
     * @param rawMessage MessageEvent passed from the captured socket
     */
    callMessageListeners(rawMessage: MessageEvent) {
        this.messageListeners.forEach((messageListener) => { messageListener(rawMessage) });
    }
}