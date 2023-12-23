"use client";

import { addChat } from "@/actions/chatActions";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import SubmitButton from "../ui/submit-button";

export default function NewChatForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("New Chat");

  const handleAddChat = async (formData: FormData) => {
    await addChat(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">New Chat</Button>
      </DialogTrigger>
      <DialogTitle>New Chat</DialogTitle>
      <DialogContent>
        <form action={handleAddChat}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            defaultValue={title}
            value={title}
            id="title"
            onChange={handleChange}
          />
          <SubmitButton>Add Chat</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
