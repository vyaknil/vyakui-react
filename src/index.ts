import "./global.css";

export { color } from './types/color';
export { font, getFont } from './types/font';
export { size } from './types/size';
export { getRem, mapRem } from './types/number';

export { VFlex, VLink, VButton } from "./components";
export { Styled, useVRegistry, VRegistry, createCSS, generateHash } from "./styled";

export type { VFlexProps } from "./components";
export type { VStyle } from "./styled";
export type { Colors, Color, Font, Size, Numbers } from "./types";