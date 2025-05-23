import { CustomerProps } from "~/types/customer-types";
import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext } from "~/types/auth-types";
import axios from "axios";
import api from "~/lib/axiosInstance";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refresh, setRefresh] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getCurrentCustomer = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/auth/me");
      // toast(<div className="p-4">{JSON.stringify(res, null, 2)}</div>);
      setCustomer(res.data.customer);
    } catch (err: unknown) {
      if (!axios.isAxiosError(err) || err.response?.status !== 401) {
        setErrorMessage("Unexpected error occur");
        console.log(
          "DEV ERROR IF NOT AXIOS ERROR IN GETTING ACCESS TOKEN | EXPIRED",
          err
        );
      }

      // This will try to generate new access token using refresh token
      try {
        console.log("Attempting to refresh the access token...");
        await api.post("/auth/refresh");

        const retryRes = await api.get("/auth/me");
        setCustomer(retryRes.data.customer);
      } catch (refreshErr: unknown) {
        setCustomer(null);

        if (axios.isAxiosError<{ error: string }>(refreshErr)) {
          const message = refreshErr.response?.data.error;
          console.log(
            "DEV ERROR IF AXIOS ERROR IN REFESHING TOKEN",
            refreshErr
          );
          setErrorMessage(
            `${refreshErr.message}: ${message || refreshErr.message}`
          );
          return;
        }

        console.log(
          "DEV ERROR IF NOTTT AXIOS ERROR IN REFESHING TOKEN",
          refreshErr
        );
        setErrorMessage("Failed to get new access token: Not an AxiosError");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentCustomer();
  }, []);

  useEffect(() => {
    if (refresh) {
      getCurrentCustomer();
      setRefresh(false); // reset trigger
    }
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{ customer, setCustomer, isLoading, errorMessage }}
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
