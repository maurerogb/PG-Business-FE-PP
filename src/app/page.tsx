import { redirect } from "next/navigation";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Business",
  description: "Business page as it should be",
};

export default function RootPage() {
  redirect("/home");
  return <></>;
}
