import { ExtendedMessage } from "@/hooks/useExtendedChat";
import { motion } from "framer-motion";
import { AssistantAvatar, UserAvatar } from "../avatar/avatars";
import MarkdownContentRenderer from "./markdown-renderer";

type MessageListProps = {
  messages: ExtendedMessage[];
};

export default function MessageList({ messages }: MessageListProps) {
  const itemVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const containsMarkdown = (content: string) => {
    const markdownPatterns = /(\*|_|`|\$|\[|\]|\(|\)|\!\[|\]\(|\$\$)/;
    return markdownPatterns.test(content);
  };

  return (
    <ul className="list-none w-full">
      {messages.map((m) => (
        <motion.li
          key={m.id}
          variants={itemVariant}
          initial="hidden"
          animate="visible"
          className="my-8"
        >
          <div className="flex items-start space-x-3 ml-[1.5rem]">
            {m.role === "user" ? <UserAvatar /> : <AssistantAvatar />}
            <span className="break-words whitespace-pre-line max-w-full overflow-hidden text-sm">
              {containsMarkdown(m.content) ? (
                <MarkdownContentRenderer content={m.content} />
              ) : (
                <p>{m.content}</p>
              )}
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
