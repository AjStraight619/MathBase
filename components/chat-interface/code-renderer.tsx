import { useEffect, useState } from "react";
import { CodeBlock, atomOneDark } from "react-code-blocks";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";

const CodeRenderer = ({ content }: { content: string }) => {
  const [copiedIndices, setCopiedIndices] = useState<boolean[]>([]);

  const extractContent = (content: string) => {
    const codePattern = /```(\w+)?\s*([\s\S]+?)```/g;
    let text = content;
    let codeBlocks = [];

    let match;
    while ((match = codePattern.exec(content)) !== null) {
      const [, language, code] = match;
      codeBlocks.push({ language: language?.trim(), code: code.trim() });
      text = text.replace(match[0], "").trim();
    }

    return { text, codeBlocks };
  };

  const handleCopyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopiedIndices((prev) =>
        prev.map((copied, idx) => (idx === index ? true : copied))
      );
      setTimeout(() => {
        setCopiedIndices((prev) =>
          prev.map((copied, idx) => (idx === index ? false : copied))
        );
      }, 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const { text, codeBlocks } = extractContent(content);

  useEffect(() => {
    setCopiedIndices(new Array(codeBlocks.length).fill(false));
  }, [codeBlocks.length]);

  return (
    <div>
      {text && <p>{text}</p>}
      {codeBlocks.map((block, index) => (
        <div key={index} className="relative my-4">
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center bg-gray-800 text-primary text-xs uppercase px-2 py-1 rounded-t-md">
            <span>{block.language || "plaintext"}</span>
            <button
              onClick={() => handleCopyToClipboard(block.code, index)}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out text-primary"
            >
              {copiedIndices[index] ? (
                <BsClipboardCheck className="w-4 h-4" />
              ) : (
                <BsClipboard className="w-4 h-4" />
              )}
            </button>
          </div>
          <CodeBlock
            text={block.code}
            language={block.language || ""}
            showLineNumbers={false}
            theme={atomOneDark}
            wrapLongLines={true}
            customStyle={{
              padding: "1rem",
              marginTop: "2.5rem",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CodeRenderer;
