import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { useReservationForm } from "~/hooks/use-reservation-form";
import { menuItems } from "~/lib/menu-lists";
import { CategoryProps, MenuItem } from "~/types/menu-types";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Separator } from "~/components/ui/separator";
import clsx from "clsx";
import { SelectedMenus } from "~/types/reservation-types";
import ImageDialog from "../ImageDialog";
import { Text, View } from "react-native";

export default function CheckboxMenus({
  category,
  field,
  count,
  selectedMenus,
}: {
  category: CategoryProps;
  field?: any;
  count: number;
  selectedMenus: SelectedMenus;
}) {
  const { handleCheckboxChange } = useReservationForm();
  // Function to get dishes by category
  const getMenusByCategory = (category: CategoryProps) => {
    return menuItems.filter((menu: MenuItem) => menu.category === category);
  };

  const getMenuItemPrice = (menuId: string) => {
    const menu = menuItems.find((item) => item._id === menuId);
    return menu ? menu.regularPricePerPax : 0;
  };

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <View>
      <View key={category} className="space-y-3">
        <Label className="mb-3 text-base font-medium">{category} Options</Label>
        <View className="gap-3">
          {getMenusByCategory(category).map((menu) => (
            <View key={menu._id} className="flex-row items-start gap-3">
              <Checkbox
                id={menu._id}
                checked={!!field.value[category]?.[menu._id]} // ✅ check if menu is selected (count > 0)
                disabled={
                  !field.value[category]?.[menu._id] && // ✅ allow unchecking
                  field.value[category]?.length >= count
                }
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    checked,
                    field,
                    category,
                    menu,
                    count,
                    getMenuItemPrice(menu._id)
                  )
                }
                className="data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-background"
              />
              <View className="justify-between">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"custom"}
                      variant={"link"}
                      className={clsx(
                        "font-medium items-start max-w-fit -mt-1",
                        {
                          "text-green-500": field.value[category]?.[menu._id],
                        }
                      )}
                      onPress={() => {
                        setActiveMenu(menu._id);
                        setIsImageDialogOpen(true);
                      }}
                    >
                      <Text className="text-foreground">{menu.name}</Text>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>View Image</TooltipContent>
                </Tooltip>
                <Label
                  htmlFor={menu._id}
                  className="text-sm cursor-pointer text-muted-foreground"
                >
                  <Text>{menu.shortDescription}</Text>
                </Label>
                {isImageDialogOpen && activeMenu === menu._id && (
                  <ImageDialog
                    item={menu}
                    isImageDialogOpen={isImageDialogOpen}
                    setIsImageDialogOpen={setIsImageDialogOpen}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
        {Array.isArray(selectedMenus[category]) &&
          selectedMenus[category].length >= count && (
            <Text className="text-xs italic text-muted-foreground">
              *You can only select up to {count} item/s for {category}.*
            </Text>
          )}
      </View>
      <Separator className="my-4" />
    </View>
  );
}
