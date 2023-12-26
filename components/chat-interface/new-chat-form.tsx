"use client";

import { addChat } from "@/actions/chatActions";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-button";

export default function NewChatForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("New Chat");
  const { push } = useRouter();

  const handleAddChat = async (formData: FormData) => {
    formData.append("title", title);
    const newChat = await addChat(formData);
    setIsOpen(false);
    toast.success("Chat added successfully!");
    if (!newChat) return;
    push(`/chat/${newChat.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-4 justify-evenly">
          New Chat
          <FiPlus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-center">New Chat</DialogTitle>

        <form action={handleAddChat} className="flex flex-col">
          <Label htmlFor="title">Title</Label>
          <Input type="text" value={title} id="title" onChange={handleChange} />
          <DialogFooter>
            {" "}
            <SubmitButton variant="secondary" className="mt-2">
              Add Chat
            </SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
