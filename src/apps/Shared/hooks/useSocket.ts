import { 
  useMemo, 
  useContext, 
} from 'react';
import { Socket, } from 'socket.io-client';

import { SocketProvider, } from '@Shared/contexts/SocketProvider';

export const useSocket: () => Socket = () => {
  const socket = useContext<Socket>(SocketProvider);
  return useMemo(
    () => socket, [socket,]
  );
}