"use client";
import React, { useMemo } from 'react'
import { VStyle } from '../styled/engine'
import { color, Colors } from '../types/color'
import { Font } from '../types/font'
import { getRem, Numbers } from '../types/number'
import { Size } from '../types/size'
import { BaseStyledProps, disabledStyle, PolymorphicComponent, transitionDuration, transitionFunction } from './index'
import { VFlex } from './vFlex'


type Variant = "default" | "outline";

type Config = {
  text: Font;
  padding: Numbers;
  gap: number;
  radius: Numbers;
  strokeWidth: number;
}

const getConfig: Record<Size, Config> = {
  default: {text: "body6", padding: [4], gap: 4, radius: [4], strokeWidth: 1},
  xs:      {text: "body5", padding: [6, 8], radius: [6], gap: 4, strokeWidth: 1},
  sm:      {text: "body4", padding: [8, 12], radius: [8], gap: 4, strokeWidth: 1},
  md:      {text: "body3", padding: [10, 16], radius: [10], gap: 8, strokeWidth: 2},
  lg:      {text: "body2", padding: [12, 20], radius: [12], gap: 8, strokeWidth: 2},
  xl:      {text: "body1", padding: [14, 24], radius: [14], gap: 8, strokeWidth: 2}
}

interface VButtonProps {
  disabled?: boolean;
  size?: Size;
  colorBg?: Colors;
  colorText?: Colors;
  variant?: Variant;
}

export const VButton: PolymorphicComponent<VButtonProps> = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as, children, vStyle = {},
      size = "default",
      disabled = false,
      variant = "default",
      colorBg = ["gray1", "gray2"],
      colorText = ["gray5", "gray5"],
      ...rest
    }: BaseStyledProps<C, VButtonProps>,
    ref: React.Ref<any>
  ) => {

    const [colorDefault, colorHover] = colorText;
    const [colorBgDefault, colorBgHover] = colorBg;
    const config = getConfig[size];
    const Component = as || "button";

    const vButtonStyle: VStyle = useMemo(() => {

      const getVariant: Record<Variant, VStyle> = {
        default: {
          backgroundColor:    color[colorBgDefault],
          transitionProperty: "color, background-color",
          "&:hover":          {
            color:           color[colorHover],
            backgroundColor: color[colorBgHover]
          }
        },
        outline: {
          backgroundColor:    "transparent",
          transitionProperty: "color, outline-color",
          outlineStyle:       "solid",
          outlineWidth:       getRem(config.strokeWidth),
          outlineColor:       "currentColor",
          "&:hover":          {
            color: color[colorHover]
          }
        }
      }

      const baseStyle: VStyle = {
        color: color[colorDefault],
        ...(!disabled? {
          cursor:                   "pointer",
          transitionDuration:       transitionDuration,
          transitionTimingFunction: transitionFunction,
          ...getVariant[variant]
        } : disabledStyle),
        ...vStyle
      }

      return baseStyle;
    }, [disabled, variant, size, colorBg, colorText, vStyle]);

    return (
      <VFlex
        as={Component as any}
        ref={ref}
        vStyle={vButtonStyle}
        align={"center"}
        padding={config.padding}
        radius={config.radius}
        text={config.text}
        gap={config.gap}
        {...rest}
      >
        {children}
      </VFlex>
    );
  }) as PolymorphicComponent<VButtonProps>;

VButton.displayName = "vButton";