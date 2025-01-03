import { useModal } from "@/app/hooks/useModalStore";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ViewAccountDetailsModal = () => {
  const { onOpen, isOpen, onClose, data, type } = useModal();
  const { user } = data;
  const isModalOpen = isOpen && type === "view-account";
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Account Details</DialogTitle>
          <DialogDescription>View your account details.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewAccountDetailsModal;
