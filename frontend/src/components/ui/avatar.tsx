import React from "react";
import { cn } from "../../lib/utils"; // Utility for conditional classNames

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback = "U", className }) => {
  return (
    <div className={cn("relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200", className)}>
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="h-full w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        <span className="text-sm font-medium text-gray-600">{fallback}</span>
      )}
    </div>
  );
};

const AvatarImage: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt || "Avatar"}
    className="h-full w-full object-cover"
    onError={(e) => (e.currentTarget.style.display = "none")}
  />
);

const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-sm font-medium text-gray-600">{children}</span>
);

export { Avatar, AvatarImage, AvatarFallback };