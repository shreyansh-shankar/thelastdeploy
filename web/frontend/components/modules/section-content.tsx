// web/frontend/components/modules/section-content.tsx

"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { Section, ModuleDetail } from "@/lib/types";
import { LabBlock } from "./lab-block";
import { CheckCircle2, ArrowLeft, ChevronRight, RefreshCw, Copy, Check, Info, Lightbulb, AlertCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

// Helper to escape HTML characters
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Custom simple syntax highlighter for devops challenges
function highlightCode(code: string, language: string) {
  if (!code) return "";
  const lang = language.toLowerCase();

  // Helper to escape HTML characters inside tokenizers
  const esc = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  if (["bash", "sh", "shell"].includes(lang)) {
    let result = "";
    let i = 0;
    const len = code.length;
    const cmds = ["docker", "sudo", "cd", "run", "npm", "git", "apt-get", "pip", "python", "cat", "echo", "mkdir", "rm", "ls", "grep", "ssh", "curl", "wget", "chmod", "chown", "systemctl"];
    
    while (i < len) {
      // Comment
      if (code[i] === "#" && (i === 0 || code[i-1] === "\n" || /\s/.test(code[i-1]))) {
        let comment = "";
        while (i < len && code[i] !== "\n") {
          comment += code[i];
          i++;
        }
        result += `<span class="text-zinc-500 font-normal">${esc(comment)}</span>`;
        continue;
      }
      
      // String
      if (code[i] === '"' || code[i] === "'") {
        const quote = code[i];
        let str = quote;
        i++;
        while (i < len && code[i] !== quote) {
          if (code[i] === "\\") {
            str += code[i];
            i++;
          }
          if (i < len) {
            str += code[i];
            i++;
          }
        }
        if (i < len) {
          str += quote;
          i++;
        }
        result += `<span class="text-sky-300">${esc(str)}</span>`;
        continue;
      }
      
      // Word (commands / flags / keywords)
      if (/[a-zA-Z0-9_-]/.test(code[i])) {
        let word = "";
        while (i < len && /[a-zA-Z0-9_-]/.test(code[i])) {
          word += code[i];
          i++;
        }
        
        if (cmds.includes(word)) {
          result += `<span class="text-emerald-400 font-semibold">${esc(word)}</span>`;
        } else if (word.startsWith("-")) {
          result += `<span class="text-amber-400">${esc(word)}</span>`;
        } else {
          result += esc(word);
        }
        continue;
      }
      
      result += esc(code[i]);
      i++;
    }
    return <span className="font-mono text-zinc-100" dangerouslySetInnerHTML={{ __html: result }} />;
  }

  if (["yaml", "yml"].includes(lang)) {
    let result = "";
    let i = 0;
    const len = code.length;
    
    while (i < len) {
      // Comment
      if (code[i] === "#") {
        let comment = "";
        while (i < len && code[i] !== "\n") {
          comment += code[i];
          i++;
        }
        result += `<span class="text-zinc-500">${esc(comment)}</span>`;
        continue;
      }
      
      // String
      if (code[i] === '"' || code[i] === "'") {
        const quote = code[i];
        let str = quote;
        i++;
        while (i < len && code[i] !== quote) {
          if (code[i] === "\\") {
            str += code[i];
            i++;
          }
          if (i < len) {
            str += code[i];
            i++;
          }
        }
        if (i < len) {
          str += quote;
          i++;
        }
        result += `<span class="text-zinc-300">${esc(str)}</span>`;
        continue;
      }
      
      // Key check
      if (/[a-zA-Z0-9_-]/.test(code[i])) {
        let word = "";
        while (i < len && /[a-zA-Z0-9_-]/.test(code[i])) {
          word += code[i];
          i++;
        }
        
        let nextIdx = i;
        while (nextIdx < len && /\s/.test(code[nextIdx]) && code[nextIdx] !== "\n") {
          nextIdx++;
        }
        
        let isKey = false;
        if (nextIdx < len && code[nextIdx] === ":") {
          if (nextIdx + 1 >= len || /\s/.test(code[nextIdx + 1])) {
            isKey = true;
          }
        }
        
        if (isKey) {
          result += `<span class="text-emerald-400 font-semibold">${esc(word)}</span>`;
        } else {
          result += esc(word);
        }
        continue;
      }
      
      result += esc(code[i]);
      i++;
    }
    return <span className="font-mono text-zinc-100" dangerouslySetInnerHTML={{ __html: result }} />;
  }

  if (["python", "py"].includes(lang)) {
    let result = "";
    let i = 0;
    const len = code.length;
    const keywords = ["def", "class", "import", "from", "as", "return", "if", "else", "elif", "for", "while", "in", "is", "not", "and", "or", "try", "except", "with", "print", "lambda", "yield"];
    
    while (i < len) {
      // Comment
      if (code[i] === "#") {
        let comment = "";
        while (i < len && code[i] !== "\n") {
          comment += code[i];
          i++;
        }
        result += `<span class="text-zinc-500">${esc(comment)}</span>`;
        continue;
      }
      
      // String
      if (code[i] === '"' || code[i] === "'") {
        const quote = code[i];
        let str = quote;
        i++;
        while (i < len && code[i] !== quote) {
          if (code[i] === "\\") {
            str += code[i];
            i++;
          }
          if (i < len) {
            str += code[i];
            i++;
          }
        }
        if (i < len) {
          str += quote;
          i++;
        }
        result += `<span class="text-emerald-300">${esc(str)}</span>`;
        continue;
      }
      
      // Word / Keyword
      if (/[a-zA-Z0-9_]/.test(code[i])) {
        let word = "";
        while (i < len && /[a-zA-Z0-9_]/.test(code[i])) {
          word += code[i];
          i++;
        }
        
        if (keywords.includes(word)) {
          result += `<span class="text-purple-400 font-semibold">${esc(word)}</span>`;
        } else {
          result += esc(word);
        }
        continue;
      }
      
      result += esc(code[i]);
      i++;
    }
    return <span className="font-mono text-zinc-100" dangerouslySetInnerHTML={{ __html: result }} />;
  }

  if (["json"].includes(lang)) {
    let result = "";
    let i = 0;
    const len = code.length;
    
    while (i < len) {
      // String
      if (code[i] === '"') {
        let str = '"';
        i++;
        while (i < len && code[i] !== '"') {
          if (code[i] === "\\") {
            str += code[i];
            i++;
          }
          if (i < len) {
            str += code[i];
            i++;
          }
        }
        if (i < len) {
          str += '"';
          i++;
        }
        
        let nextIdx = i;
        while (nextIdx < len && /\s/.test(code[nextIdx])) {
          nextIdx++;
        }
        
        if (nextIdx < len && code[nextIdx] === ":") {
          result += `<span class="text-emerald-400">${esc(str)}</span>`;
        } else {
          result += `<span class="text-sky-300">${esc(str)}</span>`;
        }
        continue;
      }
      
      // Keywords or numbers
      if (/[a-zA-Z0-9._-]/.test(code[i])) {
        let word = "";
        while (i < len && /[a-zA-Z0-9._-]/.test(code[i])) {
          word += code[i];
          i++;
        }
        
        if (["true", "false", "null"].includes(word) || !isNaN(Number(word))) {
          result += `<span class="text-amber-400">${esc(word)}</span>`;
        } else {
          result += esc(word);
        }
        continue;
      }
      
      result += esc(code[i]);
      i++;
    }
    return <span className="font-mono text-zinc-100" dangerouslySetInnerHTML={{ __html: result }} />;
  }

  return <span className="font-mono text-zinc-100">{code}</span>;
}


// Copyable CodeBlock component
interface CodeBlockProps {
  language: string;
  value: string;
}

function CodeBlock({ language, value }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative border border-border rounded-xl overflow-hidden bg-zinc-950 text-zinc-50 font-mono text-xs my-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-[10px] uppercase font-bold tracking-wider text-zinc-400 select-none">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors py-0.5 px-2 rounded hover:bg-zinc-800 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code Body */}
      <div className="p-4 overflow-x-auto max-h-[500px]">
        <div className="whitespace-pre text-left font-mono text-zinc-100 overflow-visible">
          {highlightCode(value, language)}
        </div>
      </div>
    </div>
  );
}

// GitHub-style Alert blockquote parser helper
type AlertType = "note" | "tip" | "important" | "warning" | "caution";

function parseBlockquote(children: React.ReactNode): { alertType: AlertType | null; children: React.ReactNode } {
  let alertType: AlertType | null = null;

  const traverseAndExtract = (node: React.ReactNode): React.ReactNode => {
    if (!node) return node;

    if (typeof node === "string") {
      const match = node.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/i);
      if (match) {
        alertType = match[1].toLowerCase() as AlertType;
        return match[2];
      }
      return node;
    }

    if (Array.isArray(node)) {
      const result = [...node];
      if (result.length > 0) {
        const firstProcessed = traverseAndExtract(result[0]);
        if (alertType) {
          result[0] = firstProcessed;
        }
      }
      return result;
    }

    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<any>;
      if (element.props && element.props.children) {
        const newChildren = traverseAndExtract(element.props.children);
        if (alertType) {
          return React.cloneElement(element, {}, newChildren);
        }
      }
    }

    return node;
  };

  const newChildren = traverseAndExtract(children);
  return { alertType, children: newChildren };
}

const AlertIcon: Record<AlertType, React.ComponentType<any>> = {
  note: Info,
  tip: Lightbulb,
  important: AlertCircle,
  warning: AlertTriangle,
  caution: AlertCircle,
};

const AlertStyles: Record<AlertType, { border: string; bg: string; text: string; title: string; label: string }> = {
  note: {
    border: "border-l-4 border-blue-500 dark:border-blue-400",
    bg: "bg-blue-50/60 dark:bg-blue-950/15",
    text: "text-blue-900 dark:text-blue-300",
    title: "text-blue-800 dark:text-blue-200",
    label: "Note",
  },
  tip: {
    border: "border-l-4 border-emerald-500 dark:border-emerald-400",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/15",
    text: "text-emerald-900 dark:text-emerald-300",
    title: "text-emerald-800 dark:text-emerald-200",
    label: "Tip",
  },
  important: {
    border: "border-l-4 border-green-600 dark:border-green-500",
    bg: "bg-green-50/60 dark:bg-green-950/15",
    text: "text-green-900 dark:text-green-300",
    title: "text-green-800 dark:text-green-200",
    label: "Important",
  },
  warning: {
    border: "border-l-4 border-amber-500 dark:border-amber-400",
    bg: "bg-amber-50/60 dark:bg-amber-950/15",
    text: "text-amber-900 dark:text-amber-300",
    title: "text-amber-800 dark:text-amber-200",
    label: "Warning",
  },
  caution: {
    border: "border-l-4 border-red-500 dark:border-red-400",
    bg: "bg-red-50/60 dark:bg-red-950/15",
    text: "text-red-900 dark:text-red-300",
    title: "text-red-800 dark:text-red-200",
    label: "Caution",
  },
};


interface Props {
  section: Section;
  module: ModuleDetail;
  isLoggedIn: boolean;
  isSectionComplete: (section: Section) => boolean;
  onScrollComplete: (sectionId: string, sectionXp: number) => void;
  onNavigate: (section: Section) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export function SectionContent({
  section,
  module,
  isLoggedIn,
  isSectionComplete,
  onScrollComplete,
  onNavigate,
  onRefresh,
  refreshing,
}: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const scrolledToBottomRef = useRef(false); // remembers if user scrolled to bottom

  // Reset both flags when switching sections
  useEffect(() => {
    firedRef.current = false;
    scrolledToBottomRef.current = false;
  }, [section.id]);

  // Attempt completion — called whenever scroll or labs state changes
  const tryComplete = useCallback(() => {
    if (!isLoggedIn) return;
    if (isSectionComplete(section)) return;
    if (firedRef.current) return;
    if (!scrolledToBottomRef.current) return; // haven't scrolled down yet

    if (section.labs.length === 0) {
      // Pure reading — scroll is enough
      firedRef.current = true;
      onScrollComplete(section.id, section.xp);
    } else {
      // Lab section — need all labs done too
      const allLabsDone = section.labs.every((l) => l.completed);
      if (allLabsDone) {
        firedRef.current = true;
        onScrollComplete(section.id, section.xp);
      }
      // else: wait — user will hit Refresh after finishing lab
    }
  }, [section, isLoggedIn, isSectionComplete, onScrollComplete]);

  // Intersection observer — just records that user scrolled to bottom
  useEffect(() => {
    if (!isLoggedIn || !sentinelRef.current) return;
    if (isSectionComplete(section)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !scrolledToBottomRef.current) {
          scrolledToBottomRef.current = true;
          tryComplete();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [section.id, isLoggedIn, isSectionComplete, tryComplete]);

  // Re-attempt when labs update (user hit Refresh after finishing lab)
  useEffect(() => {
    tryComplete();
  }, [section.labs, tryComplete]);

  const completed = isSectionComplete(section);
  const prevSection = module.sections.find((s) => s.order === section.order - 1);
  const nextSection = module.sections.find((s) => s.order === section.order + 1);

  const markdownComponents = {
    // Customize pre to prevent Tailwind's prose-pre styles
    pre: ({ children }: any) => {
      return <div className="my-6">{children}</div>;
    },
    // Customize code component
    code: ({ node, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match && !String(children).includes("\n");
      
      if (isInline) {
        return (
          <code
            className="text-[var(--accent-primary)] bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-semibold"
            {...props}
          >
            {children}
          </code>
        );
      }

      const codeString = String(children).replace(/\n$/, "");
      const language = match ? match[1] : "text";

      return <CodeBlock language={language} value={codeString} />;
    },
    // Customize blockquote component to support Alerts
    blockquote: ({ children }: any) => {
      const { alertType, children: cleanChildren } = parseBlockquote(children);

      if (alertType) {
        const styles = AlertStyles[alertType];
        const Icon = AlertIcon[alertType];

        return (
          <div className={`my-6 p-4 rounded-xl border-l-4 ${styles.border} ${styles.bg} ${styles.text} flex gap-3.5`}>
            <div className="shrink-0 pt-0.5">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className={`text-xs font-black uppercase tracking-wider ${styles.title}`}>
                {styles.label}
              </div>
              <div className="text-sm leading-relaxed prose-p:my-0 prose-p:text-inherit">
                {cleanChildren}
              </div>
            </div>
          </div>
        );
      }

      // Standard blockquote styling
      return (
        <blockquote className="border-l-4 border-border text-muted-foreground bg-muted/30 px-4 py-2 rounded-r-xl my-6 italic">
          {children}
        </blockquote>
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
          <p className="text-xs text-muted-foreground mt-1.5">
            {section.labs.length > 0
              ? `${section.labs.length} lab${section.labs.length !== 1 ? "s" : ""} · ${section.xp + section.labs.reduce((s, l) => s + l.xp, 0)} XP total`
              : `Reading · +${section.xp} XP`}
          </p>
        </div>
        {completed && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 bg-[rgba(var(--accent-primary-rgb),0.08)] border border-[rgba(var(--accent-primary-rgb),0.15)] text-[var(--accent-primary)]"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </div>
        )}
      </div>

      {/* Markdown */}
      {section.content && (
        <div className="prose dark:prose-invert prose-sm max-w-none mb-10
          prose-headings:font-black prose-headings:text-foreground
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
          prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-strong:text-foreground prose-strong:font-bold
          prose-code:text-[var(--accent-primary)] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:p-4
          prose-blockquote:border-l-[var(--accent-primary)] prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-xl
          prose-table:text-sm prose-th:text-muted-foreground prose-th:font-semibold prose-td:text-muted-foreground/95
          prose-hr:border-border prose-li:text-muted-foreground prose-a:text-[var(--accent-primary)] prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{section.content}</ReactMarkdown>
        </div>
      )}

      {/* Labs */}
      {section.labs.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground/60">Labs</h3>
            {isLoggedIn && (
              <button
                onClick={onRefresh}
                disabled={refreshing}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted hover:border-muted-foreground/40 transition-all disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Checking..." : "Refresh Progress"}
              </button>
            )}
          </div>
          {section.labs.map((lab) => (
            <LabBlock key={lab.id} lab={lab} moduleId={module.id} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      )}

      {/* Scroll sentinel — always present; fires only when conditions met */}
      <div ref={sentinelRef} className="h-1" />

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
        {prevSection ? (
          <button
            onClick={() => onNavigate(prevSection)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>
        ) : <div />}

        {nextSection ? (
          <button
            onClick={() => onNavigate(nextSection)}
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity cursor-pointer text-[var(--accent-primary)]"
          >
            Next Section <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href="/modules"
            className="flex items-center gap-2 text-sm font-semibold hover:opacity-85 transition-opacity cursor-pointer text-[var(--accent-primary)]"
          >
            Back to Modules <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}