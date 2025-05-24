import { CustomerProps } from "~/types/customer-types";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext } from "~/types/auth-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "~/lib/axiosInstance";
import axios from "axios";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const storeTokens = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  };

  const clearTokens = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  };

  const getCurrentCustomer = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/auth/me");

      setCustomer(res.data.customer);
    } catch (err) {
      if (!axios.isAxiosError(err) || err.response?.status !== 401) {
        setErrorMessage("Unexpected error occurred");
        console.log("Non-auth error:", err);
      }

      // Try refresh token
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await api.post("/auth/refresh", { refreshToken });

        const { accessToken, refreshToken: newRefresh } = res.data;
        await storeTokens(accessToken, newRefresh);

        const retryRes = await api.get("/auth/me");
        setCustomer(retryRes.data.customer);
      } catch (refreshErr) {
        setCustomer(null);
        await clearTokens();

        if (axios.isAxiosError<{ error: string }>(refreshErr)) {
          setErrorMessage(
            refreshErr.response?.data.error || "Token refresh failed"
          );
        } else {
          setErrorMessage("Unknown error during token refresh");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Optional: Call your backend logout endpoint if you have one
      await api.post("/auth/sign-out");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear local state and storage
      setCustomer(null);
      await clearTokens();
      setErrorMessage("");
    }
  };

  useEffect(() => {
    if (refresh) {
      getCurrentCustomer();
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    getCurrentCustomer();
  }, [customer]);

  return (
    <AuthContext.Provider
      value={{
        customer,
        setCustomer,
        isLoading,
        errorMessage,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
