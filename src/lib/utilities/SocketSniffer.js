export class SocketSniffer {

    /**
     * Responsible for binding the existing socket and handling messages sent by Socket.IO
     */
    constructor() {
        if(!SocketSniffer.instance) {
            this.socketListeners = [];
            this.bindSocket();
            SocketSniffer.instance = this;
        }

        return SocketSniffer.instance;
    }

    /**
     * 
     * @param function callback     The function to fire on messages received by the socket
     */
    addSocketListener(callback) {
        this.socketListeners.push(callback); 
        console.log(this.socketListeners);
    }

    /**
     * Message handler bound to the socket that then fires any stored socket listeners attached to the SocketSniffer
     * 
     * @param MessageEvent message  Message passed to handler from the socket 
     */
    socketMessageHandler(message) { 
        this.socketListeners.forEach((socketListener) => { socketListener(message) });
    }

    /**
     * Binds the Idlescape socket to window.IdlescapeSocket when it becomes available, as convetionally agreed upon by Idlescape scripting community
     */
    // TODO: rework this so that we don't have to rely on our send function being the first
    bindSocket() {        
        if(typeof WebSocket.prototype._send == 'undefined'){
            WebSocket.prototype._send = WebSocket.prototype.send;

            WebSocket.prototype.send = function(data) {
                this._send(data);    
                if(typeof window.IdlescapeSocket === 'undefined') {
                    window.IdlescapeSocket = this;
                    this.addEventListener('message', (message) => { new SocketSniffer().socketMessageHandler(message); });
                    this.send = this._send;
                }
            }
        }
    }
}