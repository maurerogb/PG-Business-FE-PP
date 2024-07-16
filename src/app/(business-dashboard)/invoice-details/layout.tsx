

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "generate invoice",
  description: "generate invoice",
}

export default function GenerateInvoiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">{children}</div>
  )
}


