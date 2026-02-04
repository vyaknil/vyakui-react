// type
type ColorGray = "gray1" | "gray2" | "gray3" | "gray4" | "gray5";
type ColorAccent = "accent1" | "accent2" | "accent3" | "accent4" | "accent5";
type ColorStatus = "success" | "warning" | "error" | "info";

export type Color = ColorGray | ColorAccent | ColorStatus;
export type Colors = [Color, Color];

// object
const colorGray: Record<ColorGray, string> = {
  gray1: "#F5F5F5",
  gray2: "#B8B8B8",
  gray3: "#7A7A7A",
  gray4: "#3D3D3D",
  gray5: "#000000",
} as const satisfies Record<ColorGray, string>

const colorAccent: Record<ColorAccent, string> = {
  accent1: "#CAABE0",
  accent2: "#BA59FF",
  accent3: "#9500FF",
  accent4: "#6100A6",
  accent5: "#24003D",
} as const satisfies Record<ColorAccent, string>

const colorStatus: Record<ColorStatus, string> = {
  success: "#1BE05D",
  warning: "#E09F1B",
  error:   "#E01B1B",
  info:    "#1B5DE0"
} as const satisfies Record<ColorStatus, string>

export const color: Record<Color, string> = {
  ...colorGray,
  ...colorAccent,
  ...colorStatus
} as const satisfies Record<Color, string>