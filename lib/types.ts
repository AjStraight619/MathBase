import { Chat, ChatMessage } from "@prisma/client";
import { Message as AImessage } from "ai";

export type ListMetaData = {
  id: string;
  title: string;
};

export type Item = Note | (Chat & { messages: ChatMessage[] });

export type FileMetaData = ListMetaData & {
  size?: number;
  url?: string;
};

export type SidebarClientProps = {
  chatMetaData: ListMetaData[];
  fileMetaData: FileMetaData[];
};

export type ListItems = {
  [key: string]: ListMetaData[] | FileMetaData[];
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

export type MathResponseType = {
  inputString: string;
  podsData: PodData[];
  assumptions?: Assumptions;
};

export type PodData = {
  title: string;
  content: ContentItem[];
};

export type ContentItem = {
  plaintext: string;
  imageUrl: string;
};

export type Assumptions = {
  type: string;
  word: string;
  template: string;
  count: number;
  values: AssumptionValue[];
};

export type AssumptionValue = {
  name: string;
  desc: string;
  input: string;
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
  assumptions: Assumptions[];
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
    addedToNote: boolean;
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
  payload: ListMetaData;
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

export interface ExtendedMessage extends AImessage {
  isExtractedEquation: boolean;
  extractedText: string | null;
  chatId: string;
  addedToNote: boolean;
}

export type MathButton = {
  symbol: string;
  latex: string;
  wolfram: string;
};

export type ButtonCategories = {
  basic: MathButton[];
  algebra: MathButton[];
  misc: MathButton[];
  calculus: MathButton[];
  greek: MathButton[];
};

export type SimplifiedMathResponse = {
  input: string;
  output: string;
  images: string[];
  solution: string;
};
