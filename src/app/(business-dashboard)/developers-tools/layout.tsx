

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developers tool",
  description: "Developers tool",
}

export default function DevelopersToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">{children}</div>
  )
}


