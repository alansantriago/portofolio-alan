import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-[#3b82f6]/20 bg-[#0f172a]/50 px-3 py-2 text-sm ring-offset-background placeholder:text-[#94a3b8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
