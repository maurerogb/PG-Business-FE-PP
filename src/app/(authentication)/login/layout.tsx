import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Login",
  description: "Login",
};

export default function RegistrationLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full">{children}</div>;
}
