import { Chat, ChatMessage } from "@prisma/client";

export type ListMetaData = {
  id: string;
  title: string;
};

export type Item = Note | (Chat & { messages: ChatMessage[] });

export type SidebarItem = {
  id: string;
  title: string;
};

export type FileMetaData = SidebarItem & {
  size?: number;
  url?: string;
};

export type SidebarClientProps = {
  chatMetaData: SidebarItem[];
  fileMetaData: FileMetaData[];
};

export type ListItems = {
  [key: string]: SidebarItem[] | FileMetaData[];
};

export type ExtractedText = {
  role: string;
  content: string[];
  math?: boolean;
};

export type LocalFile = {
  file: File;
  checked: boolean;
};

export type QueryResult = {
  success: boolean;
  error: boolean;
  numpods: number;
  datatypes: string;
  timedout: string;
  timedoutpods: string;
  timing: number;
  parsetiming: number;
  parsetimedout: boolean;
  recalculate: string;
  id: string;
  host: string;
  server: string;
  related: string;
  version: string;
  inputstring: string;
  pods: Pod[];
};

export type Pod = {
  title: string;
  scanner: string;
  id: string;
  position: number;
  error: boolean;
  numsubpods: number;
  subpods: Subpod[];
  expressiontypes?: { name: string };
  states?: { name: string; input: string }[];
};

export type Subpod = {
  title: string;
  img: ImageInfo;
  plaintext: string;
};

export type ImageInfo = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  type: string;
  themes: string;
  colorinvertable: boolean;
  contenttype: string;
};

export type WolframAlphaResponse = {
  queryresult: QueryResult;
};

export type MsgRole = "function" | "data" | "user" | "system" | "assistant";

export type ChatWithMessages = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: {
    id: string;
    chatId: string;
    content: string;
    role: MsgRole;
    isExtractedEquation: boolean;
    extractedText: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type ExtractedWolframData = {
  input: string;
  solution: string;
  intermediateSteps: string;
  plotImageURL: string;
  numberLineURL: string;
};

export type ActionType = "ADD_CHAT" | "DELETE_CHAT" | "UPDATE_CHAT";

export type Action = {
  type: ActionType;
  payload: ChatMetaData;
};

export type ChatMetaData = {
  id: string;
  title: string;
};

export type FolderMetaData = {
  id: string;
  title: string;
};

export type FileActionType = "ADD_FILE" | "DELETE_FILE" | "UPDATE_FILE";

export type FileAction = {
  type: FileActionType;
  payload: FileMetaData;
};

export type Note = {
  id: string;
  title: string;
  updatedAt: Date;
};

export type Folder = {
  id: string;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
};

export type AllFolders = Folder;
