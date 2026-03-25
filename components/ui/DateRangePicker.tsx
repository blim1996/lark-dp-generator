"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/style.css";

interface DateRangePickerProps {
  label?: string;
  value: { from: Date | null; to: Date | null };
  onChange: (range: { from: Date | null; to: Date | null }) => void;
  error?: string;
}

export default function DateRangePicker({
  label,
  value,
  onChange,
  error,
}: DateRangePickerProps) {
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (activeField === "from") {
      onChange({ from: date, to: value.to });
      // Auto-focus "to" field if "from" is selected and "to" is empty
      if (!value.to) {
        setActiveField("to");
      } else {
        setActiveField(null);
      }
    } else if (activeField === "to") {
      onChange({ from: value.from, to: date });
      setActiveField(null);
    }
  };

  const formatDateDisplay = (date: Date | null) => {
    return date ? format(date, "MMM d, yyyy") : "Select date";
  };

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}

      <div className="grid grid-cols-2 gap-3">
        {/* From Date */}
        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">From</label>
          <button
            type="button"
            onClick={() => setActiveField(activeField === "from" ? null : "from")}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 border text-left text-white transition-all duration-200 ${
              error
                ? "border-red-500"
                : activeField === "from"
                ? "border-blue-500 ring-2 ring-blue-500"
                : "border-gray-700"
            } focus:outline-none hover:border-gray-600`}
          >
            {formatDateDisplay(value.from)}
          </button>
        </div>

        {/* To Date */}
        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">To</label>
          <button
            type="button"
            onClick={() => setActiveField(activeField === "to" ? null : "to")}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 border text-left text-white transition-all duration-200 ${
              error
                ? "border-red-500"
                : activeField === "to"
                ? "border-blue-500 ring-2 ring-blue-500"
                : "border-gray-700"
            } focus:outline-none hover:border-gray-600`}
          >
            {formatDateDisplay(value.to)}
          </button>
        </div>
      </div>

      {/* Calendar Popup */}
      {activeField && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setActiveField(null)}
          />
          <div className="absolute top-full left-0 mt-2 z-20 bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-4">
            <DayPicker
              mode="single"
              selected={activeField === "from" ? value.from || undefined : value.to || undefined}
              onSelect={handleSelect}
              disabled={
                activeField === "to" && value.from
                  ? { before: value.from }
                  : { before: new Date() }
              }
              className="date-picker"
            />
          </div>
        </>
      )}

      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
}
