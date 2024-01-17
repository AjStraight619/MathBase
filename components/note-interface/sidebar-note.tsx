"use client";

import { AllFolders, Folder } from "@/lib/types";
import { useState } from "react";
import FolderDropdown from "./folder-dropdown";
import NewNoteForm from "./new-note-form";

type SidebarNoteProps = {
  allFolders: AllFolders[];
};

export default function SidebarNote({ allFolders }: SidebarNoteProps) {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  return (
    <div>
      <NewNoteForm
        setSelectedFolder={setSelectedFolder}
        selectedFolder={selectedFolder}
        allFolders={allFolders}
      />
      <FolderDropdown
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        allFolders={allFolders}
      />
    </div>
  );
}
