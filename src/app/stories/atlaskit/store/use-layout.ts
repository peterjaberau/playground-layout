import { LayoutContext } from "./layout-provider"
import { useSelector } from "@xstate/react"

export const useLayout = () => {
  const layoutRef = LayoutContext.useActorRef()
  const layoutState = useSelector(layoutRef, (state: any) => state)
  const layoutContext = layoutState?.context

  return {
    sendToLayout: layoutRef.send,
    layoutRef,
    layoutState,
    layoutContext,
  }
}
