import { useReservationForm } from "~/hooks/use-reservation-form";
import { PackageCategory, ServiceType } from "./package-types";

//Reservation Related Types
export type reservationType = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    isRegistered: boolean;
  };
  eventDate: Date | string | number;
  totalPrice: number;
  status: string;
  createdDate: Date | null;
  guests: number;
  address: string;
  specialInstructions: string;
  items: { name: string; quantity: number; price: number }[];
  payment: {
    status: string;
    date: Date | null;
    amount: number;
  };
  isUrgent: boolean;
};

export type PaxArrayType = "4-6 pax" | "8-10 pax" | "13-15 pax" | "18-20 pax";

export const paxArray: PaxArrayType[] = [
  "4-6 pax",
  "8-10 pax",
  "13-15 pax",
  "18-20 pax",
];

export interface MenuReservationDetails {
  quantity: number;
  paxSelected: PaxArrayType;
  pricePerPax: number;
}

export type SelectedMenus = Record<string, MenuReservationDetails>;

export interface ReservationItem {
  fullName: string;
  email: string;
  contactNumber: string;
  reservationType: "event" | "personal";
  eventType: string;
  eventDate: Date;
  eventTime: string;
  guestCount: number;
  venue: string;
  cateringOptions: "event" | "custom";
  serviceType: ServiceType;
  serviceFee: number;
  serviceHours?: string;
  selectedPackage: string;
  selectedMenus: SelectedMenus;
  totalPrice: number;
  specialRequests?: string;
  deliveryOption: "Pickup" | "Delivery";
  deliveryFee: number;
  deliveryAddress?: string;
  deliveryInstructions?: string;
}

export type ReservationTableProps = {
  reservations: reservationType[];
  dashboard?: boolean;
};

export interface BookNowProps {
  formHook: ReturnType<typeof useReservationForm>;
}

export interface SelectServingSizeProps {
  category: string;
  menu: string;
  value: SelectedMenus;
  onChange: (value: SelectedMenus) => void;
}
