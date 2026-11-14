import { defaultSystem } from "@chakra-ui/react"

/** Chakra keyframe name; use with an animation duration and timing function. */
export const runningGradientAnimation = "runningGradient"

export const runningGradientKeyframes = {
  from: { "--gradient-angle": "90deg" },
  to: { "--gradient-angle": "450deg" },
} as const

/** Accept Chakra color tokens (for example, blue.500) or CSS colors. */
export const runningGradientBackground = (colors: readonly string[]): string => {
  if (colors.length === 0) return "none"
  const resolved = colors.map((color) => defaultSystem.token.var(`colors.${color}`, color))
  return `conic-gradient(from var(--gradient-angle, 90deg), ${resolved.join(", ")}, ${resolved[0]})`
}
