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

const useSocket = ({
  onMenuUpdated,
  onMenuCreated,
  onMenuDeleted,
}: {
  onMenuUpdated: (menu: MenuItem) => void;
  onMenuCreated: (menu: MenuItem) => void;
  onMenuDeleted: (menu: MenuItem) => void;
}) => {
  useEffect(() => {
    initSocket();

    subscribeToMenuUpdates(onMenuUpdated);
    subscribeToMenuCreated(onMenuCreated);
    subscribeToMenuDeleted(onMenuDeleted);

    return () => {
      unsubscribeFromMenuUpdates();
      unsubscribeFromMenuCreated();
      unsubscribeFromMenuDeleted();
    };
  }, [onMenuUpdated, onMenuCreated, onMenuDeleted]);
};

export default useSocket;
