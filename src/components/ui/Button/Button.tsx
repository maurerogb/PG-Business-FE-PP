/* eslint-disable tailwindcss/no-custom-classname */
import { cva, type VariantProps } from "class-variance-authority"

import { twMerge } from "tailwind-merge"

const buttonVarients = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-lg border text-center text-base font-semibold",

  {
    variants: {
      intent: {
        primary: "bg-secondary-60 text-white hover:bg-secondary-70",
        secondary: "bg-transparent text-secondary-60",
        text: "border-none text-secondary-60",
      },
      shade: { dark: "bg-secondary-70", light: "bg-secondary-60", none: "" },
      size: {
        small: "min-w-20 min-h-10 h-full px-4 py-1.5 text-sm",
        normal: "p-3",
        large: " min-h-12 h-full px-24 py-3",
      },
      underline: { true: "underline", false: "" },
    },
    defaultVariants: {
      intent: "primary",
      size: "normal",
      shade: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVarients> {
  underline?: boolean
  href: string
}

export function Button({ className, intent, size, underline, ...props }: ButtonProps) {
  return (
    <a className={twMerge(buttonVarients({ intent, size, className, underline }))} {...props}>
      {props.children}
    </a>
  )
}
