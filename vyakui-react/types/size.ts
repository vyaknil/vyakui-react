// type
export type Size = "default" | "xs" | "sm" | "md" | "lg" | "xl";

// object
export const size: Record<Size, number> = {
  default: 320,
  xs:      576,
  sm:      768,
  md:      1024,
  lg:      1440,
  xl:      1920
} as const satisfies Record<Size, number>