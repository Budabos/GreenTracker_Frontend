import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const DeleteItem = ({ action, id, isPending, itemType }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this {itemType} from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={() => action(id)}
          variant="destructive"
          type="submit"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Confirm
        </Button>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteItem;
