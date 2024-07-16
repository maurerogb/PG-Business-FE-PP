/* eslint-disable tailwindcss/no-custom-classname */
import { cva, type VariantProps } from "class-variance-authority";

import { twMerge } from "tailwind-merge";

const typographyVarients = cva(
  "text-primary-70",

  {
    variants: {
      intent: {},
      level: {
        h1: "font-CenturyGothic text-[64px] font-bold",
        h2: "font-CenturyGothic text-[40px] font-bold",
        h3: "font-CenturyGothic text-[40px] font-bold",
        h4: "font-CenturyGothic text-[36px] font-bold",
        h5: "font-CenturyGothic text-[32px] font-bold",
        h6: "font-CenturyGothic text-[24px] font-semibold",
        p: "",
        CT: "font-CenturyGothic text-base font-bold leading-6",
        LP: "font-CenturyGothic text-[12px] font-normal text-gray-50",
        BP: "font-CenturyGothic text-base font-normal leading-5 text-gray-50",
        NP: "font-CenturyGothic text-[14px] font-normal leading-5 text-gray-50",
        HP: "",
      },
      shade: {
        70: "bg-primary-70",
        60: "bg-primary-60",
        100: "bg-primary-100",
        none: "",
      },
      size: {
        small: "",
        normal: "",
        large: "",
      },
      underline: { true: "underline", false: "" },
    },
    defaultVariants: {},
  },
);

export interface Heading4Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof typographyVarients> {
  underline?: boolean;
}

export function Typography({
  className,
  intent,
  level,
  size,
  underline,
  ...props
}: Heading4Props) {
  return level === "h1" ? (
    <h1
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h1>
  ) : level === "h2" ? (
    <h2
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h2>
  ) : level === "h3" ? (
    <h3
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h3>
  ) : level === "h4" ? (
    <h4
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h4>
  ) : level === "h5" ? (
    <h5
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h5>
  ) : level === "h6" ? (
    <h6
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </h6>
  ) : (
    <p
      className={twMerge(
        typographyVarients({ intent, level, size, className, underline }),
      )}
      {...props}
    >
      {props.children}
    </p>
  );
}
