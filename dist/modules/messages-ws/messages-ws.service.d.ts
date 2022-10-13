import { Socket } from 'socket.io';
export declare class MessagesWsService {
    private connectedClients;
    registerClient(client: Socket): void;
    removeClient(clientId: string): void;
    getConnectedClients(): number;
}
