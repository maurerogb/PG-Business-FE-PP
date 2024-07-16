/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client";

import { useRouter } from "next/navigation";
import { ScrollArea } from "components/ui/scroll-area";
import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { sidebarData } from "./_components/sidebar-data";
import { useState } from "react";
import { Suspense } from "react";
import Preloader from "./loading";
import Support from "./_components/support";
import RaiseTicketForm from "./_components/raise-ticket-form";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAuth = false;
  const router = useRouter();

  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    // LocalStorage is available, perform operations
    // Read or write data using window.localStorage
    isAuth = !!localStorage.getItem("token");
  }

  if (!isAuth && typeof window !== "undefined") {
    router.push("/login");
  }
  const [isOpen, setOpen] = useState<boolean>(true)
  const [isTicketOpen, setTicket] = useState<boolean>(false)


  return (
    <div className="grid overflow-hidden lg:h-screen lg:grid-cols-24">
      <aside className={`h-full overflow-hidden bg-primary-110 transition-all ${!isOpen ? "col-span-1" : "col-span-4"}`}>
        <Sidebar isOpen={isOpen} setOpen={setOpen} navArr={sidebarData} />
      </aside>
      <div className={`relative h-full ${!isOpen ? "lg:col-span-23 col-span-3" : "lg:col-span-20 col-span-3"}`}>
        <Header />
        <ScrollArea>
          <main className="h-[calc(100vh-84px)] overflow-visible bg-sky-50 bg-opacity-30 px-12 py-4">
            <Suspense fallback={<Preloader />}>
              {children}
              <Support setTicket={setTicket} />
              {
                isTicketOpen ?
                  <RaiseTicketForm handleModalPOSpopup={setTicket} />
                  : ""
              }
            </Suspense>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
}
