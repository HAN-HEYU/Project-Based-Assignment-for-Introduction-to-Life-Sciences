import { useState } from "react";
import { glossary } from "../data/glossary";

export function GlossaryDrawer() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTerm, setActiveTerm] = useState(glossary[0].term);
  const filtered = glossary.filter(
    (item) => item.term.includes(query) || item.definition.includes(query),
  );
  const active = glossary.find((item) => item.term === activeTerm) ?? filtered[0] ?? glossary[0];

  return (
    <>
      <button className="glossary-fab" onClick={() => setOpen(true)}>
        术语表
      </button>
      <div className={`drawer-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`glossary-drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-header">
          <div>
            <span>Glossary</span>
            <h2>生命科学术语表</h2>
          </div>
          <button onClick={() => setOpen(false)} aria-label="关闭术语表">
            ×
          </button>
        </div>
        <input
          className="glossary-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            const next = glossary.find(
              (item) =>
                item.term.includes(event.target.value) ||
                item.definition.includes(event.target.value),
            );
            if (next) setActiveTerm(next.term);
          }}
          placeholder="搜索关键词"
        />
        <div className="glossary-layout">
          <div className="term-list">
            {filtered.map((item) => (
              <button
                key={item.term}
                className={active.term === item.term ? "active" : ""}
                onClick={() => setActiveTerm(item.term)}
              >
                {item.term}
              </button>
            ))}
          </div>
          <article className="term-detail">
            <h3>{active.term}</h3>
            <p>{active.definition}</p>
          </article>
        </div>
      </aside>
    </>
  );
}
