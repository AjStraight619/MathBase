"use client";
import { addChat, deleteChat } from "@/actions/chatActions";
import { useItemId } from "@/hooks/useItemId";
import { ListMetaData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { CiTrash } from "react-icons/ci";
import { GiPencil } from "react-icons/gi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

/**
 * Represents the options for each chat item, like delete and edit.
 * @param {Object} props - Component props.
 * @param {ListMetaData[]} props.chatMetaData - Metadata for the chat items.
 */

export default function ItemOptions({
  chatMetaData,
}: {
  chatMetaData: ListMetaData[];
}) {
  const chatId = useItemId();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteChat = async () => {
    await deleteChat(chatId);
    setIsOpen(false);
    toast.success("Chat deleted successfully!");
    if (chatMetaData.length === 0) {
      await addChat(getDefaultFormData());
    }
    router.replace(`/chat/${chatMetaData[0]?.id}`);
  };

  const handleEditChat = async () => {};

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <BsThreeDots className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent className="w-[7rem] p-[0.5rem] flex flex-col space-y-2">
        <button
          onClick={handleEditChat}
          className="w-full flex flex-row items-center gap-2 text-left rounded-md  transition-all "
        >
          <span>
            <GiPencil className="w-3 h-3" />
          </span>
          <span className="text-xs">Edit Chat</span>
        </button>

        <button
          onClick={handleDeleteChat}
          className="w-full flex flex-row items-start gap-2  text-left rounded-md  transition-all "
        >
          <span>
            <CiTrash className="w-3 h-3" />
          </span>
          <span className="text-xs">Delete Chat</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}

const getDefaultFormData = (): FormData => {
  const formData = new FormData();
  formData.append("title", "New Chat");
  return formData;
};
