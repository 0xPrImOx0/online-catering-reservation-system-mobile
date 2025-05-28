import { useState, useEffect } from "react";
import axios from "axios";
import { CateringPackagesProps } from "~/types/package-types";
import api from "~/lib/axiosInstance";

/**
 * Hook for fetching package data without WebSocket updates
 * @returns An object containing packages, featured packages, loading state, error state, and refresh functions
 */
export const useApiPackages = () => {
  const [cateringPackages, setCateringPackages] = useState<CateringPackagesProps[]>([]);
  const [featuredPackages, setFeaturedPackages] = useState<CateringPackagesProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all packages from API
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

  // Fetch featured packages
  const fetchFeatured = async () => {
    try {
      const response = await api.get("/packages/featured");
      setFeaturedPackages(response.data.data);
    } catch (err) {
      console.error("Error fetching featured packages:", err);
      if (axios.isAxiosError<{ message: string }>(err)) {
        setError(err.message);
      }
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchPackages(), fetchFeatured()]);
    };
    loadData();
  }, []);

  return {
    cateringPackages,
    featuredPackages,
    isLoading,
    error,
    refreshPackages: fetchPackages,
    refreshFeatured: fetchFeatured,
  };
};

export default useApiPackages;
