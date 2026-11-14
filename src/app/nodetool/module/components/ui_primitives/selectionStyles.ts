import type { SystemStyleObject } from "@chakra-ui/react"
import { BORDER_RADIUS, MOTION, reducedMotion } from "./tokens"

// Chakra semantic colors respond to the active light or dark color mode.
const focusColor = "var(--chakra-colors-blue-focus-ring)"
const selectedColor = "var(--chakra-colors-blue-muted)"
const hoverColor = "var(--chakra-colors-bg-muted)"
const borderColor = "var(--chakra-colors-border)"

/** The keyboard focus outline; use a positive offset for tiles. */
export const focusRing = (offset = -2): SystemStyleObject => ({
  outline: `2px solid ${focusColor}`,
  outlineOffset: offset,
})

export const selectableRowStyles = ({ selected = false }: { selected?: boolean } = {}): SystemStyleObject => ({
  borderRadius: BORDER_RADIUS.md,
  backgroundColor: selected ? selectedColor : "transparent",
  transition: MOTION.background,
  ...reducedMotion({ transition: MOTION.none }),
  "&:hover": { backgroundColor: selected ? selectedColor : hoverColor },
  "&:focus-visible": focusRing(),
})

export const selectedRowStyles = (): SystemStyleObject => ({
  backgroundColor: selectedColor,
  "&:hover": { backgroundColor: selectedColor },
})

export const selectableTileStyles = (
  { selected = false, disabled = false }: { selected?: boolean; disabled?: boolean } = {},
): SystemStyleObject => ({
  borderRadius: BORDER_RADIUS.md,
  border: `1px solid ${selected ? focusColor : borderColor}`,
  boxShadow: selected ? `0 0 0 1px ${focusColor}` : "none",
  transition: `${MOTION.border}, ${MOTION.background}, ${MOTION.shadow}`,
  ...reducedMotion({ transition: MOTION.none }),
  ...(!disabled && !selected ? { "&:hover": { backgroundColor: hoverColor } } : {}),
  "&:focus-visible": focusRing(2),
})

export const selectedTileStyles = (): SystemStyleObject => ({
  borderColor: focusColor,
  boxShadow: `0 0 0 1px ${focusColor}`,
})
