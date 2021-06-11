import { SocketSniffer } from './lib/utilities/SocketSniffer';
import { IronmanExtension } from './lib/IronmanExtension';

const socketSniffer = new SocketSniffer();
socketSniffer.addSocketListener((message) => { console.log(message.data) });

const extension = new IronmanExtension();