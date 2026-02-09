import { VStyle } from "../styled/engine";
import { getRem } from "./number";

// type
type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type Font = `heading${FontSize}` | `body${FontSize}`;
type FontType = {
  family: "heading" | "body";
  size: number;
  weight: number;
}

// object
export const font: Record<Font, FontType> = {
  heading1: {family: "heading", size: 64, weight: 900},
  heading2: {family: "heading", size: 56, weight: 800},
  heading3: {family: "heading", size: 48, weight: 700},
  heading4: {family: "heading", size: 40, weight: 700},
  heading5: {family: "heading", size: 36, weight: 600},
  heading6: {family: "heading", size: 32, weight: 600},

  body1: {family: "body", size: 40, weight: 700},
  body2: {family: "body", size: 36, weight: 700},
  body3: {family: "body", size: 32, weight: 600},
  body4: {family: "body", size: 24, weight: 600},
  body5: {family: "body", size: 20, weight: 500},
  body6: {family: "body", size: 16, weight: 500}
} as const satisfies Record<Font, FontType>

// get
export const getFont = (font: FontType) => {
  const {family, size, weight} = font;

  return {
    fontFamily: `var(--font-${family})`,
    fontSize:   getRem(size),
    fontWeight: weight,
    lineHeight: "100%"
  } as VStyle;
}