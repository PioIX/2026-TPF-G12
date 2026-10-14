import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (options = { withCredentials: false }, serverUrl = "ws://localhost:4000/") => { //ACÁ PONER LA IP DEL BACK
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Crear una conexión con el backend usando Socket.IO
    const socketIo = io(serverUrl, options);

    // Actualizar el estado de la conexión
    socketIo.on('connect', () => {
      setIsConnected(true);
      console.log('WebSocket connectado.');
    });

    socketIo.on('disconnect', () => {
      setIsConnected(false);
      console.log('WebSocket desconectado');
    });

    // Guardar la instancia del socket en el estado
    setSocket(socketIo);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socketIo.disconnect();
    };
  }, [serverUrl, JSON.stringify(options)]);

  return { socket, isConnected };
};

export { useSocket };