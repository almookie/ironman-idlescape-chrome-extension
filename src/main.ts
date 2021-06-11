import { SocketSniffer } from './lib/utilities/SocketSniffer';
import { IronmanExtension } from './lib/IronmanExtension';

// TODO: Handle account changes based on url change in a background script and pass to this content script
// TODO: Only start this process if on the correct url, passed from background script

const socketSniffer = new SocketSniffer();
socketSniffer.attach();
const ironmanExtension = new IronmanExtension();
socketSniffer.addMessageListener(ironmanExtension.socketListener);

// Need to wait until the socket is actually attached, this process is a bit messy but required for compatability with other socket handling scripts
const socketInterval = setInterval(() => {
    console.log('Checking for an attached socket');

    if(socketSniffer.isAttached()) {
        console.log('Attached socket found, binding listeners');
        socketSniffer.bindMessageListeners();
        clearInterval(socketInterval);
    }
}, 100);