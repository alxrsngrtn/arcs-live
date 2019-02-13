import { Loader } from './loader.js';
import { MessagePort } from './message-channel.js';
export declare function FakePecFactory(loader: Loader): (id: string) => MessagePort;
