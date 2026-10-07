import { DraggablePanelProps, DraggablePanelState, DraggablePanelAction } from "./types"
export const reversePlacement: any = (placement: DraggablePanelProps["placement"]) => {
  switch (placement) {
    case "bottom": {
      return "top"
    }
    case "top": {
      return "bottom"
    }
    case "right": {
      return "left"
    }
    case "left": {
      return "right"
    }
  }
}

export function draggablePanelReducer(state: DraggablePanelState, action: DraggablePanelAction): DraggablePanelState {
  switch (action.type) {
    case "START_RESIZE": {
      return { ...state, isResizing: true, showExpand: false }
    }
    case "STOP_RESIZE": {
      return { ...state, isResizing: false, showExpand: true }
    }
    case "SET_SHOW_EXPAND": {
      return { ...state, showExpand: action.payload }
    }
    default: {
      return state
    }
  }
}