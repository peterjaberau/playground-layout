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
      return { ...state, isResizing: true }
    }
    case "STOP_RESIZE": {
      return { ...state, isResizing: false }
    }
    default: {
      return state
    }
  }
}
