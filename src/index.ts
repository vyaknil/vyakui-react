import "./global.css";

import { type VStyle, generateHash, createCSS } from "./styled/engine";
import { VRegistry, useVRegistry } from "./styled/vRegistry";
import { Styled } from "./styled/styled";

import { type Font, font, getFont } from "./types/font";
import { type Color, type Colors, color } from "./types/color";
import { type Numbers, getRem, mapRem } from "./types/number";
import { type Size, size } from "./types/size";

import { type BaseStyledProps, type PolymorphicComponent, transitionDuration, transitionFunction, disabledStyle } from "./components";
import { VFlex } from "./components/vFlex";
import { VButton } from "./components/vButton";
import { VLink } from "./components/vLink";


export type {
  VStyle,
  Font,
  Color,
  Colors,
  Numbers,
  Size,
  BaseStyledProps,
  PolymorphicComponent
}
export {
  generateHash,
  createCSS,
  VRegistry,
  useVRegistry,
  Styled,
  font,
  getFont,
  color,
  getRem,
  mapRem,
  size,
  transitionDuration,
  transitionFunction,
  disabledStyle,
  VFlex,
  VButton,
  VLink
}