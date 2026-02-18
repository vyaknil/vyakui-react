import React from 'react'
import { VStyle } from '../styled/engine'
import { Styled } from '../styled/styled'
import { font, getFont } from '../types/font'
import { getRem, mapRem } from '../types/number'
import { size, Size } from '../types/size'
import { BaseStyledProps, PolymorphicComponent } from './index'
import { VFlexProps } from './vFlex'

export type AdaptiveColumns = number | Partial<Record<Size, number>>;
export interface VMasonryProps extends Omit<VFlexProps, 'direction' | 'wrap' | 'align' | 'justify'> {
  columns?: AdaptiveColumns;
}

export const VMasonry: PolymorphicComponent<VMasonryProps> = React.forwardRef(
  <C extends React.ElementType = "div">({
      as, children, vStyle = {},
      columns = 1,
      gap = 0,
      padding = [0],
      radius = [0],
      text,
      ...rest
    }: BaseStyledProps<C, VMasonryProps>,
    ref: React.Ref<any>) => {

    const getContainerStyles = (): VStyle => {
      return {
        display: 'flex',
        flexWrap: 'wrap',
        gap: getRem(gap),
        alignItems: 'flex-start',
      };
    };
    const getItemStyles = (cols: AdaptiveColumns): VStyle => {
      const gapVal = getRem(gap);

      if (typeof cols === 'number') {
        return {
          flex: `0 0 calc((100% - (${cols} - 1) * ${gapVal}) / ${cols})`,
          maxWidth: `calc((100% - (${cols} - 1) * ${gapVal}) / ${cols})`,
          boxSizing: 'border-box',
        };
      }

      const styles: VStyle = {
        boxSizing: 'border-box',
      };

      const keys = (Object.keys(cols) as Size[]).sort((a, b) => size[a] - size[b]);

      keys.forEach((key) => {
        const value = cols[key];
        const widthCalc = `calc((100% - (${value} - 1) * ${gapVal}) / ${value})`;

        if (key === 'default') {
          styles.flex = `0 0 ${widthCalc}`;
          styles.maxWidth = widthCalc;
        } else {
          styles[`@media (min-width: ${size[key]}px)`] = {
            flex: `0 0 ${widthCalc}`,
            maxWidth: widthCalc,
          };
        }
      });
      return styles;
    };

    const containerStyle: VStyle = {
      ...getContainerStyles(),
      padding: mapRem(padding),
      borderRadius: mapRem(radius),
      ...(text && getFont(font[text])),
      ...vStyle
    };

    const itemWrapperStyle: VStyle = {
      display: 'block',
      ...getItemStyles(columns),
    };

    return (
      <Styled
        as={as || "div"}
        ref={ref}
        vStyle={containerStyle}
        {...rest}
      >
        {React.Children.map(children, (child, idx) => (
          <Styled key={idx} as="div" vStyle={itemWrapperStyle}>
            {child}
          </Styled>
        ))}
      </Styled>
    );
  }) as PolymorphicComponent<VMasonryProps>;

VMasonry.displayName = "vMasonry";