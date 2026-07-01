import type { ContentBlock } from "@/lib/docs-content/types";
import CodeBlock from "./code-block";
import Callout from "./callout";
import Collapsible from "./collapsible";
import StepList from "./step-list";
import LabCard from "./lab-card";
import Badge from "./badge";

interface PageRendererProps {
  blocks: ContentBlock[];
}

function renderInline(text: string) {
  // Handle **bold** and `code` inline
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function PageRenderer({ blocks }: PageRendererProps) {
  return (
    <div className="docs-prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return <p key={i}>{renderInline(block.text)}</p>;

          case "heading2":
            return (
              <h2 key={i} id={block.id}>
                {block.text}
              </h2>
            );

          case "heading3":
            return (
              <h3 key={i} id={block.id}>
                {block.text}
              </h3>
            );

          case "heading4":
            return (
              <h4 key={i} id={block.id}>
                {block.text}
              </h4>
            );

          case "code":
            return <CodeBlock key={i} lang={block.lang} code={block.code} />;

          case "callout":
            return (
              <Callout
                key={i}
                variant={block.variant}
                title={block.title}
                text={block.text}
              />
            );

          case "steps":
            return <StepList key={i} steps={block.steps} />;

          case "collapsible":
            return (
              <Collapsible key={i} trigger={block.trigger}>
                <p style={{ margin: 0, fontSize: "14px", color: "#8888aa", lineHeight: 1.6 }}>
                  {renderInline(block.content)}
                </p>
                {block.code && (
                  <CodeBlock lang="bash" code={block.code} />
                )}
              </Collapsible>
            );

          case "table":
            return (
              <div key={i} style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      {block.headers.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "bullet-list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );

          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;

          case "divider":
            return <hr key={i} />;

          case "lab-list":
            return (
              <div key={i}>
                {block.labs.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </div>
            );

          case "badge-list":
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
                {block.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      background: "rgba(13,13,31,0.4)",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#a0a0c0" }}>{item.label}</span>
                    <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                  </div>
                ))}
              </div>
            );

          case "grid":
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "16px",
                  margin: "20px 0",
                }}
              >
                {block.columns.map((col, j) => (
                  <div
                    key={j}
                    style={{
                      padding: "16px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "10px",
                      background: "rgba(13,13,31,0.5)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#22c55e",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: "10px",
                      }}
                    >
                      {col.title}
                    </div>
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {col.items.map((item, k) => (
                        <li
                          key={k}
                          style={{
                            fontSize: "13px",
                            color: "#7070a0",
                            paddingLeft: "12px",
                            position: "relative",
                            marginBottom: "6px",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              left: 0,
                              color: "#22c55e",
                              opacity: 0.5,
                            }}
                          >
                            ›
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );

          case "arch-diagram":
            return (
              <div
                key={i}
                className="docs-arch-diagram"
                dangerouslySetInnerHTML={{ __html: block.svg }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
