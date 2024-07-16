import { cn } from "lib/utils";

interface CardContainerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function CardContainer({
  children,
  className,
  ...props
}: CardContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-full rounded-md border border-solid border-gray-200 bg-white p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
