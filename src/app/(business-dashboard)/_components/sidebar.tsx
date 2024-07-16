/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { LuChevronDown } from "react-icons/lu"

import { Button } from "components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu"

import { useMerchantStore, useHydrateStore } from "store"

import { cn } from "lib/utils"
import { ScrollArea } from "components/ui/scroll-area"
import { sidebarData, SvgLogoComponent } from "./sidebar-data"
import { Typography } from "components/ui/Typography"
import { CgClose } from "react-icons/cg"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navArr: typeof sidebarData,
  setOpen?: any,
  isOpen?: boolean
}
export function Sidebar({ className, setOpen, isOpen }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const currentMerchant = useHydrateStore(useMerchantStore, (state) => state.currentMerchant)

  return (
    <nav className={cn("col-span-4 h-full bg-primary-80", className)}>
      <div className="flex flex-col items-center py-6 relative">
        {isOpen ?
          <SvgLogoComponent width={isOpen ? null : 596} height={isOpen ? null : 395} />
          :
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            <SvgLogoComponent width={isOpen ? null : 596} height={isOpen ? null : 395} />
          </div>
        }

        {isOpen ? <CgClose onClick={() => setOpen(false)} className="absolute top-[23px] left-[23px] text-[20px] text-[white] cursor-pointer" />
          : ""}

      </div>
      <div className="flex flex-col h-full space-y-4">
        {isOpen ? <div className="space-y-2">
          <Typography className="flexflex-row items-center gap-[14px] self-center text-center text-[16px] font-normal leading-[24px] text-white">
            {currentMerchant?.businessName}
          </Typography>

          <Typography className="text-center text-cyan-100 text-xs font-normal font-['Inter'] leading-none">
            Merchant ID: {currentMerchant?.merchantCode}    <button
        className=" absolute top-1.5 cursor-pointer"
        // onClick={toggleSidebar}
      >
        <LuChevronDown size={24} />
      </button>
          </Typography>
        </div> : ""}

        <ScrollArea className="h-[70vh]">
          {sidebarData.map(({ list, section }) => {
            return (
              <div className="h-full py-4" key={section}>
                <div className="flex flex-col space-y-1">
                  {list.map(({ name, SVGIcon, path = "/", tagText = "" }) => {
                    if (name.toLowerCase() === "logout") {
                      return (
                        <div className="w-full">
                          {
                            isOpen ?
                              <Button
                                asChild
                                variant="ghost"
                                key={name}
                                size="lg"
                                onClick={() => {
                                  router.push("/login")
                                  localStorage.clear()
                                }}
                                className={cn(
                                  "w-full justify-start space-x-2 rounded-none text-white text-center",
                                  pathname === path
                                    ? "bg-white font-semibold hover:bg-primary-50"
                                    : "hover:bg-primary-50 hover:text-white active:text-white"
                                )}
                              >
                                <Link key={path} href={path as string}>
                                  <SVGIcon isActive={pathname === path} activeColor="#48B8E6" defaultColor="#FFFFFF" />
                                  <span>{name}</span>
                                </Link>
                              </Button>
                              :
                              <Button
                                asChild
                                variant="ghost"
                                key={name}
                                size="lg"
                                onClick={() => {
                                  router.push("/login")
                                  localStorage.clear()
                                }}
                                className={cn(
                                  "rounded-none text-white py-6 w-full",
                                  pathname === path
                                    ? "bg-white font-semibold hover:bg-primary-50"
                                    : "hover:bg-primary-50 hover:text-white active:text-white"
                                )}
                              >
                                <Link key={path} href={path as string} className="px-[10px] w-full flex items-center">
                                  <SVGIcon isActive={pathname === path} activeColor="#48B8E6" defaultColor="#FFFFFF" />
                                </Link>
                              </Button>
                          }

                        </div>

                      )
                    }
                    return (
                      <div className="w-full">
                        {
                          isOpen ?
                            <Button
                              asChild
                              key={name}
                              size="lg"
                              variant="ghost"
                              className={cn(
                                "w-full justify-start space-x-2 rounded-none text-white py-6",
                                pathname === path
                                  ? "bg-white font-semibold hover:text-primary-60 text-primary-50"
                                  : "hover:bg-primary-50 hover:text-white active:text-white"
                              )}
                            >
                              <Link key={path} href={path as string} className="flex items-center">
                                <div className="flex items-center space-x-3">
                                  <SVGIcon isActive={pathname === path} activeColor="#48B8E6" defaultColor="#FFFFFF" />
                                  <span>{name}</span>
                                </div>

                                {tagText ? (
                                  <div className="rounded-[36px] border border-secondary-70 bg-secondary-60 px-2.5 py-1.5 text-[8px] font-bold uppercase leading-[7.5px] tracking-[0.5px]">
                                    {tagText}
                                  </div>
                                ) : null}

                                <span></span>
                              </Link>
                            </Button> :
                            <Button
                              asChild
                              key={name}
                              size="lg"
                              variant="ghost"
                              className={cn(
                                "rounded-none text-white py-6 w-full",
                                pathname === path
                                  ? "bg-white font-semibold hover:text-primary-60 text-primary-50"
                                  : "hover:bg-primary-50 hover:text-white active:text-white"
                              )}
                            >
                              <Link key={path} href={path as string} className="flex items-center px-[10px] w-full">
                                <SVGIcon isActive={pathname === path} activeColor="#48B8E6" defaultColor="#FFFFFF" />
                              </Link>
                            </Button>
                        }
                      </div>


                    )
                  })}
                </div>
              </div>
            )
          })}
        </ScrollArea>
      </div>
    </nav>
  )
}
