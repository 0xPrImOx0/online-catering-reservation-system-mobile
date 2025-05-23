import { useEffect, useState } from "react";
import axios from "axios";
import {
  initSocket,
  subscribeToPackageCreated,
  subscribeToPackageDeleted,
  subscribeToPackageUpdates,
  unsubscribeFromPackageCreated,
  unsubscribeFromPackageDeleted,
  unsubscribeFromPackageUpdates,
} from "~/lib/api/socket";
import { CateringPackagesProps } from "~/types/package-types";
import api from "~/lib/axiosInstance";

// Internal hook for socket management
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

// Main hook for packages data management
export const usePackages = () => {
  const [cateringPackages, setCateringPackages] = useState<
    CateringPackagesProps[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle package updates from socket
  const handlePackageUpdated = (updatedPackage: CateringPackagesProps) => {
    console.log("🔄 Received updated package from socket:", updatedPackage);
    setCateringPackages((prev) =>
      prev.map((pkg) => (pkg._id === updatedPackage._id ? updatedPackage : pkg))
    );
  };

  // Handle new package creation from socket
  const handlePackageCreated = (newPackage: CateringPackagesProps) => {
    console.log("🆕 New package created from socket:", newPackage);
    setCateringPackages((prev) => [...prev, newPackage]);
  };

  // Handle package deletion from socket
  const handlePackageDeleted = (deletedPackage: CateringPackagesProps) => {
    console.log("❌ Package deleted from socket:", deletedPackage);
    setCateringPackages((prev) =>
      prev.filter((pkg) => pkg._id !== deletedPackage._id)
    );
  };

  // Fetch packages from API
  const fetchPackages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/packages");
      setCateringPackages(response.data.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
      const errorMessage = axios.isAxiosError<{ error: string }>(err)
        ? err.response?.data.error || "Failed to fetch packages"
        : "An unexpected error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data fetching
  useEffect(() => {
    fetchPackages();
  }, []);

  // Set up socket listeners
  useSocketPackages({
    onPackageUpdated: handlePackageUpdated,
    onPackageCreated: handlePackageCreated,
    onPackageDeleted: handlePackageDeleted,
  });

  return {
    cateringPackages,
    isLoading,
    error,
    refresh: fetchPackages,
  };
};

// Export the hook as default for easier imports
export default usePackages;
