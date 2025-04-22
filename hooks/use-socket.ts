// hooks/useSocket.ts
import { MenuItem } from "~/types/menu-types";
import {
  initSocket,
  subscribeToMenuCreated,
  subscribeToMenuUpdates,
  subscribeToMenuDeleted,
  unsubscribeFromMenuCreated,
  unsubscribeFromMenuUpdates,
  unsubscribeFromMenuDeleted,
} from "~/libs/socket";
import { useEffect } from "react";

const useSocket = (onMenuChanges: (menu: MenuItem) => void) => {
  useEffect(() => {
    // Initialize the socket connection when the component mounts
    initSocket();

    // Subscribe to socket events
    subscribeToMenuUpdates(onMenuChanges);
    subscribeToMenuCreated(onMenuChanges);
    subscribeToMenuDeleted(onMenuChanges);

    // Clean up the socket event listeners when the component unmounts
    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
      unsubscribeFromMenuDeleted();
    };
  }, [onMenuChanges]);
};

export default useSocket;
