import "./global.css";
import { color as _color } from './types/color'
import { font as _font, getFont as _getFont } from './types/font'
import { getRem as _getRem, mapRem as _mapRem } from './types/number'
import { size as _size } from './types/size'


export type { VFlexProps } from "./components";
export { VFlex, VLink, VButton } from "./components";


export type { VStyle } from "./styled";
export { Styled, useVRegistry, VRegistry, createCSS, generateHash } from "./styled";
export type { Colors, Color, Font, Size, Numbers } from "./types";

export const color = _color;
export const font = _font;
export const size = _size;
export const getFont = _getFont;
export const getRem = _getRem;
export const mapRem = _mapRem;