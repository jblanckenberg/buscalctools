"use client";

import { useId } from "react";
import { clsx } from "clsx";

type Props = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  prefix?: string;
  suffix?: string;
  helper?: string;
  placeholder?: string;
  step?: string;
  min?: number;
  max?: number;
  id?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  helper,
  placeholder,
  step = "any",
  min,
  max,
  id,
}: Props) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helper ? `${inputId}-helper` : undefined;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="mb-1 block text-sm font-medium text-brand-dark"
      >
        {label}
      </label>
      <div
        className={clsx(
          "flex items-stretch overflow-hidden rounded-lg border border-gray-300 bg-white",
          "focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/20"
        )}
      >
        {prefix && (
          <span className="flex items-center justify-center bg-brand-light px-3 text-sm font-medium text-brand-dark">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
          aria-describedby={helperId}
          className="min-h-[44px] w-full flex-1 bg-transparent px-3 text-base text-brand-dark placeholder:text-gray-400 focus:outline-none"
        />
        {suffix && (
          <span className="flex items-center justify-center bg-brand-light px-3 text-sm font-medium text-brand-dark">
            {suffix}
          </span>
        )}
      </div>
      {helper && (
        <p id={helperId} className="mt-1 text-xs text-gray-500">{helper}</p>
      )}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  id,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  helper?: string;
  id?: string;
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helper ? `${inputId}-helper` : undefined;
  return (
    <div className="w-full">
      <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-brand-dark">
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={helperId}
        className="min-h-[44px] w-full rounded-lg border border-gray-300 bg-white px-3 text-base text-brand-dark placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
      />
      {helper && <p id={helperId} className="mt-1 text-xs text-gray-500">{helper}</p>}
    </div>
  );
}
