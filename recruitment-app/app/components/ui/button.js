"use client";

import React from "react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/80 focus:ring-primary",
    secondary: "bg-muted text-white hover:bg-muted/80 focus:ring-muted",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    outline:
      "border border-border text-border hover:bg-border/80 focus:ring-border",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const combinedClasses =
    `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
