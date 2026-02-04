import React from "react";
import { Styled } from "../styled/styled";
import { color, Colors } from '../types'
import { BaseStyledProps, disabledStyle, PolymorphicComponent, transitionDuration, transitionFunction } from "./index";
import { VStyle } from '../styled/engine';


type Target = "_blank" | "_self" | "_top" | "_parent";

interface VLinkProps {
  disabled?: boolean;
  colorText?: Colors;
  href?: string;
  target?: Target;
}

export const VLink: PolymorphicComponent<VLinkProps> = React.forwardRef(
  <C extends React.ElementType = "a">({
      as, children, vStyle = {},
      disabled = false,
      colorText = ["gray1", "gray2"],
      href, target = "_self",
      onClick,
      ...rest
    }: BaseStyledProps<C, VLinkProps>,
    ref: React.Ref<any>) => {

    const Component = as || "a";
    const [colorTextDefault, colorTextHover] = colorText;

    const vLinkStyle: VStyle = {
      display: "inline-block",
      color: color[colorTextDefault],
      ...(!disabled && {
        transitionDuration:       transitionDuration,
        transitionTimingFunction: transitionFunction,
        transitionProperty:       "color",
        cursor:                   "pointer",
        "&:hover":                {
          color: color[colorTextHover]
        }
      }),
      ...(disabled && disabledStyle),
      ...vStyle
    }

    if (href) {
      return (
        <Styled
          as={Component}
          ref={ref}
          vStyle={vLinkStyle}
          href={href}
          target={target}
          {...rest}
        >
          {children}
        </Styled>
      );
    }

    return (
      <Styled
        as={Component}
        ref={ref}
        vStyle={vLinkStyle}
        onClick={onClick}
        {...rest}
      >
        {children}
      </Styled>
    );

  }) as any;

VLink.displayName = "vLink";