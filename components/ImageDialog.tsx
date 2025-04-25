import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { X } from "lucide-react-native";
import { ImageDialogProps } from "~/types/component-types";
import { Image, View } from "react-native";

export default function ImageDialog({
  item,
  isImageDialogOpen,
  setIsImageDialogOpen,
}: ImageDialogProps) {
  return (
    <Dialog
      open={isImageDialogOpen}
      onOpenChange={(open) => {
        setIsImageDialogOpen(open);
      }}
    >
      <DialogContent className="p-0 overflow-hidden bg-transparent border-0 shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{item.name}</DialogTitle>
          {"shortDescription" in item ? (
            <DialogDescription>{item.shortDescription}</DialogDescription>
          ) : (
            <DialogDescription>{item.description}</DialogDescription>
          )}
        </DialogHeader>
        <View className="relative w-auto h-auto">
          <Tooltip>
            <TooltipTrigger asChild>
              <View className="relative">
                <View className="relative z-10">
                  <Image
                    source={{ uri: item.imageUrl }}
                    width={1500}
                    height={725}
                    alt={item.name}
                  />
                  <DialogClose className="absolute flex items-center justify-center w-10 h-10 text-foreground transition-colors rounded-full top-4 right-4 bg-black/70 backdrop-blur-sm hover:bg-black">
                    <X className="w-5 h-5" />
                  </DialogClose>
                </View>
              </View>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-base">{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </View>
      </DialogContent>
    </Dialog>
  );
}
