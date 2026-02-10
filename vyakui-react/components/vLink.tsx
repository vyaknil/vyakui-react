import React from "react";
import { VStyle } from '../styled/engine'
import { color, Colors } from '../types/color'
import { Font } from '../types/font'
import { getRem, mapRem, Numbers } from '../types/number'
import { Size } from '../types/size'
import { BaseStyledProps, disabledStyle, PolymorphicComponent, transitionDuration, transitionFunction } from './index'
import { VFlex } from './vFlex'


type Target = "_blank" | "_self" | "_top" | "_parent";
type Variant = "default" | "underline" | "background";
type Config = {
  text: Font;
  padding: Numbers;
  gap: number;
  radius: Numbers;
  lineHeight: number;
}

const getConfig: Record<Size, Config> = {
  default: {text: "body6", padding: [4],  gap: 4, radius: [4],  lineHeight: 1},
  xs:      {text: "body5", padding: [4, 6],  gap: 4, radius: [6],  lineHeight: 1},
  sm:      {text: "body4", padding: [6],  gap: 4, radius: [6],  lineHeight: 1},
  md:      {text: "body3", padding: [6, 8],  gap: 8, radius: [8],  lineHeight: 2},
  lg:      {text: "body2", padding: [8],  gap: 8, radius: [8],  lineHeight: 2},
  xl:      {text: "body1", padding: [8, 10], gap: 8, radius: [10], lineHeight: 2}
};

export interface VLinkProps {
  disabled?: boolean;
  colorText?: Colors;
  href?: string;
  target?: Target;
  variant?: Variant;
  size?: Size;
}

export const VLink: PolymorphicComponent<VLinkProps> = React.forwardRef(
  <C extends React.ElementType = "a">({
      as, children, vStyle = {},
      disabled = false,
      colorText = ["gray1", "gray2"],
      href, target = "_self",
      variant = "default",
      size = "default",
      onClick,
      ...rest
    }: BaseStyledProps<C, VLinkProps>,
    ref: React.Ref<any>) => {

    const [colorDefault, colorHover] = colorText;
    const config = getConfig[size];

    const hoverColor = color[colorHover];
    const getVariant: Record<Variant, VStyle> = {
      default:    {
        transitionProperty: "color",
        "&:hover":          {color: hoverColor}
      },
      underline:  {
        position:           "relative",
        transitionProperty: "color",
        "&::after":         {
          content:            '""',
          position:           "absolute",
          top:                "100%",
          height:             getRem(config.lineHeight),
          width:              "0",
          transitionProperty: "background-color",
          backgroundColor:    "transparent"
        },
        "&:hover":          {
          color:      hoverColor,
          "&::after": {width: "100%", backgroundColor: hoverColor}
        }
      },
      background: {
        transitionProperty: "color, background-color",
        padding:            mapRem(config.padding),
        borderRadius:       mapRem(config.radius),
        "&:hover":          {backgroundColor: hoverColor}
      }
    };


    const finalVStyle: VStyle = {
      color:   color[colorDefault],
      ...(!disabled? {
        transitionDuration,
        transitionTimingFunction: transitionFunction,
        cursor:                   "pointer",
        ...getVariant[variant]
      } : disabledStyle),
      ...vStyle
    }

    const FinalComponent = href? (as || "a") : "span";

    return (
      <VFlex
        inline={true}
        text={config.text}
        gap={config.gap}
        align={"center"}
        as={FinalComponent as any}
        ref={ref}
        vStyle={finalVStyle}
        href={href? href : undefined}
        target={href? target : undefined}
        onClick={disabled? undefined : onClick}
        {...rest}
      >
        {children}
      </VFlex>
    );
  }) as PolymorphicComponent<VLinkProps>;

VLink.displayName = "vLink";