"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  open: boolean;
  content: ReactNode;
  anchorRect: DOMRect | null;
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

const Tooltip = ({
  open,
  content,
  anchorRect,
  offsetX = 8,
  offsetY = 0,
  className = "",
}: TooltipProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open || !anchorRect) {
    return null;
  }

  const top = anchorRect.top + anchorRect.height / 2 + offsetY;
  const left = anchorRect.right + offsetX;

  return createPortal(
    <div
      className={`pointer-events-none fixed z-1100 min-w-max rounded-full bg-black/90 px-3 py-1 text-[11px] font-semibold text-white shadow-xl transition-opacity duration-150 ${className}`}
      style={{
        top,
        left,
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
    >
      {content}
    </div>,
    document.body,
  );
};

export default Tooltip;
