import { createContext, } from 'react';
import { io, Socket, } from 'socket.io-client';

const TWO_MINUTES_IN_MS = 60000 * 2;

const socket = io(import.meta.env.VITE_SOCKET_URI, {
  reconnectionDelay: TWO_MINUTES_IN_MS,
  reconnectionDelayMax: TWO_MINUTES_IN_MS * 2.5,
  autoConnect: false,
});

export const SocketProvider = createContext<Socket>(socket);
SocketProvider.displayName = 'SockerProvider';
