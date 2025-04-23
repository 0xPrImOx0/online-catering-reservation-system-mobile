import { CustomSelectItemProps } from "~/types/component-types";
import { CategoryProps } from "~/types/menu-types";
import { PackageOption } from "~/types/package-types";

export const categories: CategoryProps[] = [
  "Soup",
  "Salad",
  "Beef",
  "Pork",
  "Noodle",
  "Chicken",
  "Seafood",
  "Vegetable",
  "Dessert",
  "Beverage",
];

export const defaultCategoryAndCount: PackageOption[] = [
  { category: "Soup", count: 5 },
  { category: "Salad", count: 5 },
  { category: "Beef", count: 5 },
  { category: "Pork", count: 5 },
  { category: "Noodle", count: 5 },
  { category: "Chicken", count: 5 },
  { category: "Seafood", count: 5 },
  { category: "Vegetable", count: 5 },
  { category: "Dessert", count: 5 },
  { category: "Beverage", count: 5 },
];

type AllergenProps = {
  id: string;
  text: string;
};

export const allergens: AllergenProps[] = [
  { id: "1", text: "Milk" },
  { id: "2", text: "Eggs" },
  { id: "3", text: "Fish" },
  { id: "4", text: "Shellfish" },
  { id: "5", text: "Tree nuts" },
  { id: "6", text: "Peanuts" },
  { id: "7", text: "Wheat" },
  { id: "8", text: "Soybeans" },
  { id: "9", text: "Sesame" },
  { id: "10", text: "Gluten" },
  { id: "11", text: "Mustard" },
  { id: "12", text: "Celery" },
  { id: "13", text: "Lupin" },
  { id: "14", text: "Molluscs" },
  { id: "15", text: "Sulphites" },
  { id: "16", text: "Soy" },
  { id: "17", text: "Nuts" },
];

export const selectorItems: CustomSelectItemProps[] = [
  { value: "default", title: "Default" },
  { value: "price-asc", title: "Price: Low to High" },
  { value: "price-desc", title: "Price: High to Low" },
  { value: "rating-desc", title: "Highest Rated" },
  { value: "name-asc", title: "Name: A to Z" },
  { value: "name-desc", title: "Name: Z to A" },
];

export const categorySelect: CustomSelectItemProps[] = [
  { value: "all", title: "All" },
  { value: "soup", title: "Soup" },
  { value: "salad", title: "Salad" },
  { value: "beef", title: "Beef" },
  { value: "pork", title: "Pork" },
  { value: "noodle", title: "Noodle" },
  { value: "chicken", title: "Chicken" },
  { value: "seafood", title: "Seafood" },
  { value: "vegetable", title: "Vegetable" },
  { value: "dessert", title: "Dessert" },
  { value: "beverage", title: "Beverage" },
];

export const allergensSelect: CustomSelectItemProps[] = [
  { value: "Milk", title: "Milk" },
  { value: "Eggs", title: "Eggs" },
  { value: "Fish", title: "Fish" },
  { value: "Shellfish", title: "Shellfish" },
  { value: "Tree Nuts", title: "Tree nuts" },
  { value: "Peanuts", title: "Peanuts" },
  { value: "Wheat", title: "Wheat" },
  { value: "Soybeans", title: "Soybeans" },
  { value: "Sesame", title: "Sesame" },
  { value: "Gluten", title: "Gluten" },
  { value: "Mustard", title: "Mustard" },
  { value: "Celery", title: "Celery" },
  { value: "Lupin", title: "Lupin" },
  { value: "Molluscs", title: "Molluscs" },
  { value: "Sulphites", title: "Sulphites" },
  { value: "Soy", title: "Soy" },
  { value: "Nuts", title: "Nuts" },
];
