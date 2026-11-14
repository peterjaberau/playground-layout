"use client"

import { ChakraProvider, createSystem, defaultConfig, defineConfig, defineTokens } from "@chakra-ui/react"
import type { ReactNode } from "react"
import type { SystemStyleObject } from "@chakra-ui/react"
import { GAP, MARGIN, PADDING, SPACING } from "./spacing"
import { focusRing, selectableRowStyles, selectableTileStyles, selectedRowStyles, selectedTileStyles } from "./selectionStyles"
import { runningGradientAnimation, runningGradientKeyframes } from "./runningGradient"
import {
  BORDER_RADIUS,
  CONTROL,
  EYEBROW,
  FONT_SIZE_MONO,
  FONT_SIZE_SANS,
  FONT_WEIGHT,
  ICON_SIZE,
  SHADOW,
  STUDIO_ASSISTANT_WIDTH,
  TYPOGRAPHY,
  Z_INDEX,
} from "./tokens"

// Alias each named step to Chakra's built-in spacing scale.
const spacingTokens = (values: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      { value: value === 0 ? "0px" : `{spacing.${value}}` },
    ]),
  )

// Keep primitive names available as Chakra tokens without replacing its defaults.
const tokens = defineTokens({
  fontSizes: {
    sans: Object.fromEntries(Object.entries(FONT_SIZE_SANS).map(([key, value]) => [key, { value }])),
    mono: Object.fromEntries(Object.entries(FONT_SIZE_MONO).map(([key, value]) => [key, { value }])),
  },
  fontWeights: Object.fromEntries(Object.entries(FONT_WEIGHT).map(([key, value]) => [key, { value }])),
  radii: {
    nodetool: {
      ...Object.fromEntries(Object.entries(BORDER_RADIUS).map(([key, value]) => [key, { value }])),
      control: { value: CONTROL.radius },
    },
  },
  sizes: {
    control: Object.fromEntries(Object.entries(CONTROL.height).map(([key, value]) => [key, { value: `${value}px` }])),
    icon: Object.fromEntries(Object.entries(ICON_SIZE).map(([key, value]) => [key, { value: `${value}px` }])),
    studioAssistant: { value: `${STUDIO_ASSISTANT_WIDTH}px` },
  },
  spacing: {
    control: Object.fromEntries(Object.entries(CONTROL.paddingX).map(([key, value]) => [key, { value: `${value}px` }])),
    nodetool: spacingTokens(SPACING),
    gap: spacingTokens(GAP),
    padding: spacingTokens(PADDING),
    margin: spacingTokens(MARGIN),
  },
  zIndex: { nodetool: Object.fromEntries(Object.entries(Z_INDEX).map(([key, value]) => [key, { value }])) },
  shadows: { nodetool: Object.fromEntries(Object.entries(SHADOW()).map(([key, value]) => [key, { value }])) },
})

const config = defineConfig({
  globalCss: {
    "@property --gradient-angle": {
      syntax: '"<angle>"',
      inherits: "false",
      initialValue: "90deg",
    } as unknown as SystemStyleObject,
  },
  theme: {
    keyframes: { [runningGradientAnimation]: runningGradientKeyframes },
    layerStyles: {
      focusRing: { value: focusRing() },
      selectableRow: { value: selectableRowStyles() },
      selectedRow: { value: selectedRowStyles() },
      selectableTile: { value: selectableTileStyles() },
      selectedTile: { value: selectedTileStyles() },
    },
    tokens,
    textStyles: {
      eyebrow: { value: EYEBROW },
      sans: Object.fromEntries(Object.entries(TYPOGRAPHY.sans).map(([key, value]) => [key, { value }])),
      mono: Object.fromEntries(Object.entries(TYPOGRAPHY.mono).map(([key, value]) => [key, { value }])),
    },
  },
})

export const nodetoolSystem = createSystem(defaultConfig, config)

export function NodetoolProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={nodetoolSystem}>{children}</ChakraProvider>
}
