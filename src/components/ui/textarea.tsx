import * as React from "react";

import { cn } from "lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 text-cyan-800 border-blue-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
