"use client";

import { useState } from "react";

interface CodeBlockProps {
  lang: string;
  code: string;
}

export default function CodeBlock({ lang, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip prompt characters and comments for copying
    const cleanCode = code
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ") && !line.startsWith("# !")) return "";
        return line;
      })
      .join("\n")
      .trim();
    navigator.clipboard.writeText(cleanCode || code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, i: number) => {
    // Bash prompt lines
    if (lang === "bash" && !line.startsWith("#") && line.trim() !== "" && !line.startsWith(" ") && !line.startsWith("\t")) {
      return (
        <div key={i}>
          <span className="token-prompt">$ </span>
          <span>{line}</span>
        </div>
      );
    }
    // Comment lines
    if (line.startsWith("# ")) {
      return (
        <div key={i}>
          <span className="token-comment">{line}</span>
        </div>
      );
    }
    // Output lines (indented or starting with specific chars)
    if (line.startsWith("//")) {
      return (
        <div key={i}>
          <span className="token-comment">{line}</span>
        </div>
      );
    }
    return <div key={i}>{line || "\u00a0"}</div>;
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        <span className="docs-code-lang">{lang}</span>
        <button
          className={`docs-code-copy${copied ? " copied" : ""}`}
          onClick={handleCopy}
          type="button"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="docs-code-content">
        {code.split("\n").map((line, i) => renderLine(line, i))}
      </div>
    </div>
  );
}
