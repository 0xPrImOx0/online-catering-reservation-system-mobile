// hooks/useSocket.ts
import {
  initSocket,
  subscribeToPackageCreated,
  subscribeToPackageDeleted,
  subscribeToPackageUpdates,
  unsubscribeFromPackageCreated,
  unsubscribeFromPackageDeleted,
  unsubscribeFromPackageUpdates,
} from "~/lib/socket";
import { useEffect } from "react";
import { CateringPackagesProps } from "~/types/package-types";

const useSocketPackages = ({
  onPackageUpdated,
  onPackageCreated,
  onPackageDeleted,
}: {
  onPackageUpdated: (pkg: CateringPackagesProps) => void;
  onPackageCreated: (pkg: CateringPackagesProps) => void;
  onPackageDeleted: (pkg: CateringPackagesProps) => void;
}) => {
  useEffect(() => {
    initSocket();

    subscribeToPackageUpdates(onPackageUpdated);
    subscribeToPackageCreated(onPackageCreated);
    subscribeToPackageDeleted(onPackageDeleted);

    return () => {
      unsubscribeFromPackageUpdates();
      unsubscribeFromPackageCreated();
      unsubscribeFromPackageDeleted();
    };
  }, [onPackageUpdated, onPackageCreated, onPackageDeleted]);
};

export default useSocketPackages;
