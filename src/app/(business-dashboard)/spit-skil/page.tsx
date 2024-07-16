import { Metadata } from "next";
import EmptyState from "./components/EmptyState";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Business page as it should be",
};

export default function SpitSkil() {
  return <main className="flex flex-col items-center">
    <div className="w-[60%] flex flex-col items-center mt-[10%]">
      <EmptyState />
    </div>
  </main>;
}
