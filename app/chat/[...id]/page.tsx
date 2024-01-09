import { getChatById } from "@/actions/chatActions";
import Chat from "@/components/chat-interface/Chat";
import { prisma } from "@/lib/prisma";
import { ChatWithMessages } from "@/lib/types";

type ChatPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    selectedNote?: string;
  };
};

/**
 * Fetches and returns the title of a note based on its ID.
 * Returns undefined if no noteId is provided or if the note is not found.
 *
 * @param {string} noteId - The ID of the note for which the title is requested.
 * @returns {Promise<string | undefined>} - A promise that resolves to the note's title or undefined.
 */

const getNoteTitle = async (noteId: string) => {
  if (!noteId) return;
  const noteName = await prisma.note.findUnique({
    where: {
      id: noteId,
    },
    select: {
      title: true,
    },
  });
  return noteName?.title;
};

/**
 * ChatPage is responsible for rendering the chat interface along with additional
 * details like the selected note title. It fetches chat and note data based on the URL parameters.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.params - Route parameters.
 * @param {string} props.params.id - The ID of the chat.
 * @param {Object} props.searchParams - Search parameters from the URL.
 * @param {string} [props.searchParams.selectedNote] - The optional ID of the selected note.
 */

export default async function ChatPage({
  params,
  searchParams,
}: ChatPageProps) {
  let selectedNoteTitle = "";
  let selectedNoteId: string | undefined = "";

  const id = params.id[0];
  selectedNoteId = searchParams?.selectedNote;
  selectedNoteTitle = (await getNoteTitle(
    selectedNoteId ?? ""
  )) as unknown as string;

  const chatById = (await getChatById(
    id,
    selectedNoteId
  )) as unknown as ChatWithMessages;
  return <Chat chatById={chatById} selectedNoteTitle={selectedNoteTitle} />;
}
