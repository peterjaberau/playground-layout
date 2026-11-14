"use client"

import { useEffect, useState } from "react"
import IdeWorkbench from "./ide-workbench"

export default function Page() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted ? <IdeWorkbench /> : null
}
