import { UseFormReturn } from "react-hook-form";
import { CustomerProps } from "./customer-types";

export type SignInFormValues = {
  email: string;
  password: string;
};

export interface SignInFormProps {
  form: UseFormReturn<SignInFormValues>;
  onSubmit: (data: SignInFormValues) => void;
  error: string;
}

export type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface SignUpFormProps {
  form: UseFormReturn<SignUpFormValues>;
  onSubmit: (data: SignUpFormValues) => void;
  error: string;
}

export interface IAuthContext {
  customer: CustomerProps | null;
  setCustomer: (customer: CustomerProps | null) => void;
  isLoading: boolean;
  errorMessage: string;
}

