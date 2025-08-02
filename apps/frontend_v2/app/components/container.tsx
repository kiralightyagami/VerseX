import { cn } from "../lib/utils";
import React from 'react'

export const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
  return (
    <div className={cn("max-w-6xl mx-auto px-4 w-full md:py-6", className)}>
        {children}
    </div>
  )
}
