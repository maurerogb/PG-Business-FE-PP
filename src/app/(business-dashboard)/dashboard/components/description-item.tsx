import React from "react"
import { cn } from "lib/utils"

type Props = {
  label: string
  item1: string
  item2?: string
  item1Icon?: any
  item2Icon?: any
  className?: string
}

export const DescriptionItem = (props: Props) => {
  const { item1 = "item1", label = "label" } = props
  return (
    <div className={cn("w-72 h-11 flex-col justify-start items-start gap-0.5 inline-flex", props.className)}>
      <div className="text-slate-500 text-xs font-normal font-['Century Gothic']">{label}</div>

      <div className="">
        <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
          <span>{props.item1Icon || props.item1Icon}</span>
          {item1}
        </div>

        {props.item2 || props.item2Icon ? (
          <div className="w-72 h-7 text-gray-700 text-base font-bold font-['Century Gothic'] leading-snug">
            <span>{props.item2Icon || props.item2Icon}</span>
            {props.item2}
          </div>
        ) : null}
      </div>
    </div>
  )
}
