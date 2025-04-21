import { UseFormReturn } from "react-hook-form";

export type SignInFormValues = {
  email: string;
  password: string;
};

export interface SignInFormProps {
  form: UseFormReturn<SignInFormValues>;
  onSubmit: (data: SignInFormValues) => void;
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
}

export type ForgotPasswordFormValues = {
  email: string;
};

export interface ForgotPasswordFormProps {
  form: UseFormReturn<ForgotPasswordFormValues>;
  onSubmit: (data: ForgotPasswordFormValues) => void;
}
