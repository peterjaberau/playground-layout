/** Shared UI primitive values backed by Chakra's default design tokens. */
import type { SystemStyleObject } from "@chakra-ui/react"

export const FONT_WEIGHT = {
  normal: 400,
  medium: 500,
  semibold: 600,
} as const

export const FONT_SIZE_SANS = {
  title: "var(--chakra-font-sizes-lg)",
  body: "var(--chakra-font-sizes-md)",
  label: "var(--chakra-font-sizes-sm)",
  caption: "var(--chakra-font-sizes-xs)",
} as const

export const FONT_SIZE_MONO = {
  code: "var(--chakra-font-sizes-sm)",
  strong: "var(--chakra-font-sizes-sm)",
  label: "var(--chakra-font-sizes-sm)",
  caption: "var(--chakra-font-sizes-xs)",
} as const

export const TYPOGRAPHY = {
  sans: {
    title: { fontSize: FONT_SIZE_SANS.title, fontWeight: FONT_WEIGHT.semibold, fontFamily: "var(--chakra-fonts-heading)", lineHeight: 1.3 },
    body: { fontSize: FONT_SIZE_SANS.body, fontWeight: FONT_WEIGHT.normal, fontFamily: "var(--chakra-fonts-body)", lineHeight: 1.45 },
    label: { fontSize: FONT_SIZE_SANS.label, fontWeight: FONT_WEIGHT.medium, fontFamily: "var(--chakra-fonts-body)", lineHeight: 1.35 },
    caption: { fontSize: FONT_SIZE_SANS.caption, fontWeight: FONT_WEIGHT.normal, fontFamily: "var(--chakra-fonts-body)", lineHeight: 1.4 },
  },
  mono: {
    code: { fontSize: FONT_SIZE_MONO.code, fontWeight: FONT_WEIGHT.normal, fontFamily: "var(--chakra-fonts-mono)", lineHeight: 1.5 },
    strong: { fontSize: FONT_SIZE_MONO.strong, fontWeight: FONT_WEIGHT.semibold, fontFamily: "var(--chakra-fonts-mono)", lineHeight: 1.5 },
    label: { fontSize: FONT_SIZE_MONO.label, fontWeight: FONT_WEIGHT.medium, fontFamily: "var(--chakra-fonts-mono)", lineHeight: 1.35 },
    caption: { fontSize: FONT_SIZE_MONO.caption, fontWeight: FONT_WEIGHT.normal, fontFamily: "var(--chakra-fonts-mono)", lineHeight: 1.4 },
  },
} as const

export const EYEBROW = {
  ...TYPOGRAPHY.sans.caption,
  textTransform: "uppercase",
  letterSpacing: "var(--chakra-letter-spacings-wider)",
} as const

export const MOTION = {
  fast: "var(--chakra-durations-faster) ease",
  normal: "var(--chakra-durations-moderate) ease",
  slow: "var(--chakra-durations-slow) ease",
  border: "border-color var(--chakra-durations-moderate) ease",
  opacity: "opacity var(--chakra-durations-fast) ease",
  transform: "transform var(--chakra-durations-faster) ease",
  shadow: "box-shadow var(--chakra-durations-moderate) ease",
  background: "background-color var(--chakra-durations-fast) ease",
  all: "all var(--chakra-durations-moderate) ease",
  spin: "1s linear",
  pulse: "2s ease-in-out",
  none: "none",
} as const

export const reducedMotion = (overrides: SystemStyleObject): SystemStyleObject => ({
  "@media (prefers-reduced-motion: reduce)": overrides,
})

/** Normalize a Chakra style object or an array of style objects. */
export type SxEntry = SystemStyleObject | boolean
export const sxEntries = (sx: SxEntry | readonly SxEntry[] | undefined): SxEntry[] =>
  sx === undefined ? [] : Array.isArray(sx) ? [...sx] : [sx as SxEntry]

export const Z_INDEX = {
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1300,
  modal: 1400,
  tooltip: 1800,
  toast: 1700,
} as const

export const BORDER_RADIUS = {
  xs: "var(--chakra-radii-xs)",
  sm: "var(--chakra-radii-sm)",
  md: "var(--chakra-radii-md)",
  lg: "var(--chakra-radii-lg)",
  xl: "var(--chakra-radii-xl)",
  xxl: "var(--chakra-radii-2xl)",
  circle: "var(--chakra-radii-full)",
  pill: "var(--chakra-radii-full)",
} as const

// Numeric values remain numbers so callers can use them in arithmetic.
export const CONTROL = {
  height: { xs: 24, sm: 28, md: 32, lg: 36, xl: 44 },
  paddingX: { compact: 8, normal: 12 },
  radius: BORDER_RADIUS.md,
} as const

export const ICON_SIZE = { xs: 14, sm: 16, md: 18, lg: 20 } as const

export const SHADOW = () =>
  ({
    ambient: "var(--chakra-shadows-xs)",
    sm: "var(--chakra-shadows-sm)",
    md: "var(--chakra-shadows-md)",
    lg: "var(--chakra-shadows-lg)",
    xl: "var(--chakra-shadows-xl)",
    panelLeft: "var(--chakra-shadows-md)",
    panelRight: "var(--chakra-shadows-md)",
  }) as const

export const thinScrollbarStyles = () => ({
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--chakra-colors-border-emphasized)",
    borderRadius: BORDER_RADIUS.lg,
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "var(--chakra-colors-fg-muted)" },
})

export const scrollbarStyles = () => ({
  scrollbarWidth: "thin" as const,
  scrollbarColor: "var(--chakra-colors-border-emphasized) transparent",
  "&::-webkit-scrollbar": { width: 10 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--chakra-colors-border-emphasized)",
    borderRadius: BORDER_RADIUS.pill,
    border: "2px solid transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "var(--chakra-colors-fg-muted)" },
})

export const STUDIO_ASSISTANT_WIDTH = 320
