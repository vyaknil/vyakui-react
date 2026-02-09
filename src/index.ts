import "./global.css";

import { color as _color } from './types/color';
import { font as _font, getFont as _getFont } from './types/font';
import { getRem as _getRem, mapRem as _mapRem } from './types/number';
import { size as _size } from './types/size';
import { VFlex as _VFlex, VLink as _VLink, VButton as _VButton } from "./components";
import {
  Styled as _Styled,
  useVRegistry as _useVRegistry,
  VRegistry as _VRegistry,
  createCSS as _createCSS,
  generateHash as _generateHash
} from "./styled";

export type { VFlexProps } from "./components";
export type { VStyle } from "./styled";
export type { Colors, Color, Font, Size, Numbers } from "./types";

export {
  _color as color,
  _font as font,
  _size as size,
  _getFont as getFont,
  _getRem as getRem,
  _mapRem as mapRem,
  _VFlex as VFlex,
  _VLink as VLink,
  _VButton as VButton,
  _Styled as Styled,
  _useVRegistry as useVRegistry,
  _VRegistry as VRegistry,
  _createCSS as createCSS,
  _generateHash as generateHash,
};