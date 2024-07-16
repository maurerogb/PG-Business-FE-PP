import { Metadata } from "next"
import { ScrollArea } from "components/ui/scroll-area"
import NavComponent from "./components/nav-component"
import { Suspense } from "react";
import Preloader from "./loading";


export const metadata: Metadata = {
    title: "Settings",
    description: "Pay access settings",
}


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-full flex flex-col">
            <Suspense fallback={<Preloader />}>
                <p className="text-[#177196] text-[40px] font-[700] leading-normal mb-[20px]">Setting</p>
                <NavComponent />
                <ScrollArea className="pt-11 h-[650px] w-full">
                    {children}
                </ScrollArea>
            </Suspense>
        </div>
    )
}































