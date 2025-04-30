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
      <DialogContent className="overflow-hidden p-0 bg-transparent border-0 shadow-none">
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
                    alt={item.name}
                    width={350}
                    height={600}
                    className=""
                  />
                  <DialogClose className="flex absolute top-4 right-4 justify-center items-center w-10 h-10 rounded-full backdrop-blur-sm transition-colors text-foreground bg-black/70 hover:bg-black">
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
