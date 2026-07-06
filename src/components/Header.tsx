import { useState } from "react";
import type { ViewId } from "../types";
import type { ModuleId } from "../types";
import { modules } from "../data/modules";
import { ProgressBar } from "./ProgressBar";

interface HeaderProps {
  currentView: ViewId;
  currentModuleId: ModuleId;
  completedCount: number;
  totalCount: number;
  examScore?: number | null;
  onNavigate: (view: ViewId) => void;
}

const navItems: Array<{ id: ViewId; label: string }> = [
  { id: "home", label: "首页" },
  { id: "timeline", label: "时间线" },
  { id: "map", label: "知识地图" },
  { id: "lab", label: "互动实验室" },
  { id: "review", label: "复习中心" },
  { id: "challenge", label: "最终挑战" },
  { id: "references", label: "参考资料" },
];

export function Header({
  currentView,
  currentModuleId,
  completedCount,
  totalCount,
  examScore,
  onNavigate,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeModule = modules.find((module) => module.id === currentModuleId);
  const navigate = (view: ViewId) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <button className="brand-mark" onClick={() => navigate("home")}>
        <span className="brand-orbit" />
        <span>
          <strong>转基因时光机</strong>
          <small>生命科学探索实验室</small>
        </span>
      </button>

      <button
        className="menu-toggle"
        aria-expanded={menuOpen}
        aria-label="打开或关闭导航菜单"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`top-nav ${menuOpen ? "open" : ""}`} aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={currentView === item.id ? "active" : ""}
            onClick={() => navigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-progress">
        <div className="progress-copy">
          <span>
            已完成 {completedCount} / {totalCount} 个模块 · 考试
            {typeof examScore === "number" ? ` ${examScore} / 100` : "未完成"}
          </span>
          {currentView === "module" && activeModule && <strong>{activeModule.title}</strong>}
        </div>
        <ProgressBar value={completedCount} max={totalCount} label="模块点亮" />
      </div>
    </header>
  );
}
