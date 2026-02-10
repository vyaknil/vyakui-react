import React from 'react'
import { VStyle } from '../styled/engine'
import { Styled } from '../styled/styled'
import { font, Font, getFont } from '../types/font'
import { getRem, mapRem, Numbers } from '../types/number'
import { BaseStyledProps, PolymorphicComponent } from './index'


type Direction = "row" | "row-reverse" | "column" | "column-reverse";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";
type Align = "flex-start" | "flex-end" | "center";
type Justify = Align | "space-between" | "space-around" | "space-evenly";

export interface VFlexProps {
  inline?: boolean;
  direction?: Direction;
  wrap?: Wrap;
  align?: Align;
  justify?: Justify;
  gap?: number;
  padding?: Numbers;
  radius?: Numbers;
  text?: Font;
}

export const VFlex: PolymorphicComponent<VFlexProps> = React.forwardRef(
  <C extends React.ElementType = "div">({
      as, children, vStyle = {},
      inline = false,
      direction = "row",
      wrap = "nowrap",
      align = "flex-start",
      justify = "flex-start",
      gap = 0,
      padding = [0],
      radius = [0],
      text,
      ...rest
    }: BaseStyledProps<C, VFlexProps>,
    ref: React.Ref<any>) => {

    const vFlexStyle: VStyle = {
      display:        inline? "inline-flex" : "flex",
      flexDirection:  direction,
      flexWrap:       wrap,
      alignItems:     align,
      justifyContent: justify,
      gap:            getRem(gap),
      padding:        mapRem(padding),
      borderRadius:   mapRem(radius),
      ...(text && getFont(font[text])),
      ...vStyle
    }

    return (
      <Styled
        as={as || "div"}
        ref={ref}
        vStyle={vFlexStyle}
        {...rest}
      >
        {children}
      </Styled>
    );
  }) as PolymorphicComponent<VFlexProps>;

VFlex.displayName = "vFlex";