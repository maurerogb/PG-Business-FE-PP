"use client"

import { HydrateProps, Hydrate as RQHydrate } from "@tanstack/react-query"
import React from "react"

function Hydrate(props: HydrateProps) {
  return <RQHydrate {...props} />
}

export default Hydrate
