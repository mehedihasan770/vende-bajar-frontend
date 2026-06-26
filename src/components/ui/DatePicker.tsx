"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
  value?: string | null;
  onChange: (isoDate: string | null) => void;
  placeholder?: string;
}

export default function DatePicker({ value, onChange, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function handleSelect(date?: Date) {
    setSelected(date);
    setOpen(false);
    if (date) onChange(date.toISOString().slice(0, 10));
    else onChange(null);
  }

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="w-full text-left px-4 py-3 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm focus:outline-none flex items-center justify-between"
        >
          <span className="text-sm text-gray-700">
            {selected
              ? selected.toISOString().slice(0, 10)
              : placeholder || "Select date"}
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

      <div
        className={`absolute z-30 mt-2 w-full rounded-2xl shadow-lg transition transform ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"}`}
      >
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-3">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            fixedWeeks
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
      </div>
    </div>
  );
}
