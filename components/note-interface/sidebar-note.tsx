"use client";

import { AllFolders } from "@/lib/types";
import { useState } from "react";
import FolderDropdown from "./folder-dropdown";
import NewNoteForm from "./new-note-form";

type SidebarNoteProps = {
  allFolders: AllFolders[];
};

export default function SidebarNote({ allFolders }: SidebarNoteProps) {
  const [selectedFolder, setSelectedFolder] = useState<AllFolders | null>(null);
  return (
    <div>
      <NewNoteForm allFolders={allFolders} />
      <FolderDropdown
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        allFolders={allFolders}
      />
    </div>
  );
}
