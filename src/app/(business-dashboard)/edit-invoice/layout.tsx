import { Metadata } from "next"

export const metadata: Metadata = {
  title: "edit draft invoice",
  description: "edit invoice",
}

export default function GenerateInvoiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">{children}</div>
  )
}


