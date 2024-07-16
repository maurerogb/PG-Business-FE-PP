import { Metadata } from "next"
import { Nav } from "./_components/nav"

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
}

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full">
      <Nav />
      {children}
    </div>
  )
}
