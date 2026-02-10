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

    const getColumnStyles = (cols: AdaptiveColumns): VStyle => {
      if (typeof cols === 'number') {
        return { columnCount: cols };
      }
      const styles: VStyle = {};
      const keys = (Object.keys(cols) as Size[]).sort((a, b) => size[a] - size[b]);
      keys.forEach((key) => {
        const value = cols[key];
        if (key === 'default') {
          styles.columnCount = value;
        } else {
          styles[`@media (min-width: ${size[key]}px)`] = {
            columnCount: value
          };
        }
      });
      return styles;
    };

    const containerStyle: VStyle = {
      display: 'block',
      columnGap: getRem(gap),
      ...getColumnStyles(columns),

      padding: mapRem(padding),
      borderRadius: mapRem(radius),

      ...(text && getFont(font[text])),
      ...vStyle
    };

    const itemWrapperStyle: VStyle = {
      display: 'block',
      width: '100%',
      breakInside: 'avoid',
      overflow: 'hidden',
      marginBottom: getRem(gap)
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