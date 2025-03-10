import React from "react";
import { cn } from "../../lib/utils"; // Utility for conditional classNames

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <textarea
        className={cn(
          "w-full rounded-lg border p-2 text-sm shadow-sm focus:outline-none focus:ring-2", 
          error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export { Textarea };
