"use client";

import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const ReactMarkdown = dynamic(() => import("react-markdown"));

type MarkdownContentRendererProps = {
  content: string;
};

const MarkdownContentRenderer = ({ content }: MarkdownContentRendererProps) => {
  return (
    <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownContentRenderer;
