import { Metadata } from "next";
import EmptyState from "./components/EmptyState";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Business page as it should be",
};

export default function AuditLog() {
  return (
    <main>
      <div className="w-full flex flex-col items-center mt-[20%]">
        <EmptyState />
      </div>
    </main>
  );
}
