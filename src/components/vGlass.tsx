import React, { useMemo, useId } from "react";
import { Styled } from "../styled/styled";
import { BaseStyledProps, PolymorphicComponent } from "./index";
import { VStyle } from "../styled/engine";


interface VGlassProps {
  frost?: number;
  refraction?: number;
  depth?: number;
  dispersion?: number;
  splay?: number;
}

export const VGlass: PolymorphicComponent<VGlassProps> = React.forwardRef(
  <C extends React.ElementType = "div">({
      as, children, vStyle = {},
      frost = 20,
      refraction = 15,
      depth = 1,
      dispersion = 0.4,
      splay = 0.9,
      ...rest
    }: BaseStyledProps<C, VGlassProps>,
    ref: React.Ref<any>) => {

    const id = useId().replace(/:/g, "");

    const finalVStyle = useMemo(() => {

      const style: VStyle = {
        position: "relative",
        overflow: "hidden",
        display:  "block",

        backdropFilter:       `blur(${frost}px) saturate(140%)`,
        WebkitBackdropFilter: `blur(${frost}px) saturate(140%)`,

        boxShadow: `
          inset 0 1px ${2 * depth}px rgba(255,255,255,0.7),
          inset 0 -4px ${8 * depth}px rgba(0,0,0,0.25),
          0 20px 40px rgba(0,0,0,0.25)
        `,

        filter: `url(#vglass-refraction-${id})`,

        // Dispersion (RGB split)
        "&::after": {
          content:       '""',
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          mixBlendMode:  "screen",
          background:    `
            radial-gradient(circle at 30% 30%, rgba(255,0,0,${0.2 * dispersion}), transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(0,0,255,${0.2 * dispersion}), transparent 40%)
          `
        },

        // Splay (edge fade)
        WebkitMaskImage: `
          radial-gradient(circle at center,
          black ${70 * splay}%,
          transparent 100%)
        `,

        ...vStyle
      };

      return style;

    }, [frost, depth, dispersion, splay, vStyle, id]);

    const FinalComponent = as || "div";

    return (
      <>
        <svg width="0" height="0" style={{position: "absolute"}}>
          <filter id={`vglass-refraction-${id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={refraction}
            />
          </filter>
        </svg>

        <Styled
          as={FinalComponent}
          ref={ref}
          vStyle={finalVStyle}
          {...rest}
        >
          {children}
        </Styled>
      </>
    );
  }
) as any;

VGlass.displayName = "VGlass";