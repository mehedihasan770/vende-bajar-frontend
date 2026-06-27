"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  value?: string | null;
  onChange: (isoDate: string | null) => void;
  placeholder?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function DatePicker({
  value,
  onChange,
  placeholder,
  containerRef,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const [renderPopup, setRenderPopup] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // local date string helper — timezone bug fix
  function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node;
      if (!ref.current || !popupRef.current) return;
      if (ref.current.contains(target) || popupRef.current.contains(target))
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    if (!open && !renderPopup) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const containerRect = containerRef?.current?.getBoundingClientRect();
      const width = containerRect?.width ?? buttonRect.width;
      const left = containerRect?.left ?? buttonRect.left;
      const popupHeight = popupRef.current?.offsetHeight || 320;
      const spaceBelow = window.innerHeight - buttonRect.bottom - 8;
      const top =
        spaceBelow >= popupHeight
          ? buttonRect.bottom + 8
          : Math.max(8, buttonRect.top - popupHeight - 8);

      setPopupPosition({ top, left, width });
    };

    if (open) {
      setRenderPopup(true);
      requestAnimationFrame(updatePosition);
    }

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, renderPopup, containerRef]);

  useEffect(() => {
    if (!open) {
      const timeout = window.setTimeout(() => setRenderPopup(false), 200);
      return () => window.clearTimeout(timeout);
    }
  }, [open]);

  function handleSelect(date?: Date) {
    setSelected(date);
    setOpen(false);
    if (date) onChange(toLocalDateString(date));
    else onChange(null);
  }

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="w-full text-left px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:outline-none flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">
            {selected ? toLocalDateString(selected) : placeholder || "Select date"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {renderPopup &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popupRef}
            className={`fixed z-50 rounded-2xl shadow-lg transition-all duration-200 ${
              open
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }`}
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
              width: popupPosition.width,
            }}
          >
            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-3">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                fixedWeeks
                classNames={{
                  months: "w-full",
                  month: "w-full",
                  table: "w-full border-collapse",
                  head_row: "flex w-full",
                  head_cell: "flex-1 text-center text-xs font-medium text-gray-500 py-1",
                  row: "flex w-full mt-1",
                  cell: "flex-1 text-center p-0",
                  day: "w-full h-8 text-sm rounded-lg hover:bg-primary/10 transition-colors mx-auto flex items-center justify-center",
                  day_selected: "!bg-primary !text-white !font-semibold",
                  day_today: "!bg-secondary !text-white !font-semibold",
                  day_outside: "text-gray-300",
                  day_disabled: "text-gray-300 cursor-not-allowed",
                  nav: "flex items-center justify-between mb-2",
                  nav_button: "p-1 rounded-lg hover:bg-gray-100 transition-colors",
                  caption: "flex items-center justify-between px-1 mb-2",
                  caption_label: "text-sm font-bold text-gray-700",
                }}
              />
              <div className="flex justify-end mt-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSelect(undefined)}
                  className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg bg-primary text-white text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}