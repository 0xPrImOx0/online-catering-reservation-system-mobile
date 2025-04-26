import { Dispatch, ReactNode, SetStateAction } from "react";
import { AllergenProps, MenuItem } from "./menu-types";
import { SetStateBoolean } from "./global-types";
import { CateringPackagesProps, EventType, ServiceType } from "./package-types";

//Search Bar Types
export type SearchInputProps = {
  query: string;
  setQuery: (query: string) => void;
  placeholderTitle: string;
};

//Custom Select Types
export type CustomSelectItemProps = {
  label: string;
  value: string;
};

export type CustomSelectProps = {
  defaultValue: string;
  placeholder: string;
  items: CustomSelectItemProps[];
  size?: "sm" | "md" | "lg";
  value: string;
  onValueChange: (value: string) => void;
};

//View Mode Props
export type ViewModeButtonsProps = {
  viewMode: "grid" | "list";
  setViewMode: Dispatch<SetStateAction<"grid" | "list">>;
};

//  Custom Pagination Types
export type CustomPaginationProps = {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  totalMenus: number;
  menusPerPage: number;
  onPageChange: (e: number) => void;
  title?: string;
};

//ArrayInputProps

export type Tag = {
  id: string;
  text: string;
};
export interface TagInputProps {
  id?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  placeholder?: string;
  styleClasses?: {
    tagList?: { container?: string };
    input?: string;
    tag?: { body?: string; closeButton?: string };
  };
  activeTagIndex?: number | null;
  setActiveTagIndex?: React.Dispatch<React.SetStateAction<number | null>>;
  inlineTags?: boolean;
  inputFieldPosition?: "top" | "bottom";
  enableAutocomplete?: boolean;
  restrictTagsToAutocompleteOptions?: boolean;
}

export type ArrayInputProps = {
  tags: Tag[];
  title: string;
  autocomplete?: boolean;
  suggestions?: Tag[];
};

export interface ImageDialogProps {
  item: MenuItem | CateringPackagesProps;
  isImageDialogOpen: boolean;
  setIsImageDialogOpen: SetStateBoolean;
}

export type FilterSectionProps = {
  query: string;
  setQuery: (query: string) => void;
  filters: {
    category: string;
    allergens: AllergenProps;
    sortBy: string;
  };
  setFilters: Dispatch<
    SetStateAction<{
      category: string;
      allergens: AllergenProps;
      sortBy: string;
    }>
  >;
};

export type SelectedEventContainerProps = {
  cateringPackages: CateringPackagesProps[];
};

export type FormStepType = {
  id: string;
  title: string;
  description: string;
};

export type MultiStepFormProps = {
  formSteps: FormStepType[];
  children: ReactNode[];
  onSubmit: () => void;
  onNextStep?: (currentStep: number) => Promise<boolean>;
  onPrevStep?: (currentStep: number) => boolean;
  onComplete?: () => void;
  onCancel?: () => void;
  initialStep?: number;
  isSubmitComplete?: boolean;
  submitButtonText?: string;
  nextButtonText?: string;
  previousButtonText?: string;
  doneButtonText?: string;
  cancelButtonText?: string;
  isReservationForm?: boolean;
  setShowPackageSelection?: Dispatch<SetStateAction<boolean>>;
};
