import { MenuItem } from "~/types/menu-types";
import { SetStateBoolean } from "~/types/global-types";
import { Dispatch, SetStateAction } from "react";

//Customer Related Types
export type CustomerType = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: Date;
  totalReservations: number;
  totalSpent: number;
  lastReservation: Date;
};

export type ConcernType = {
  id: string;
  customerId: string | null;
  customerName: string;
  message: string;
  submittedAt: Date;
  status: string;
  isRegistered: boolean;
};

export type CustomerProps = {
  _id: string;
  fullName: string;
  email: string;
  role: "customer" | "caterer";
  contactNumber?: string;
  profileImage?: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};