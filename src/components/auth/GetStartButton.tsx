"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const GetStartedButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {

  const route = useRouter();


    if(mode === "modal"){
        <span>
            Start Up
        </span>
    }

    const onClick = ()=> {
       route.push("/registration")
        
    }

  return ( 
  <span onClick={onClick} className="cursor-pointer">{children}</span>)
}
