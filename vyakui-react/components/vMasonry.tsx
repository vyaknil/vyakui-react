"use client";
import React, { useState, useEffect, useMemo } from 'react'
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

const getActiveColumns = (cols: AdaptiveColumns): number => {
  if (typeof cols === 'number') return cols;
  if (typeof window === 'undefined') return cols.default || 1;

  const width = window.innerWidth;
  const sortedBreakpoints = (Object.keys(cols) as Size[])
  .filter(k => k !== 'default')
  .sort((a, b) => size[b] - size[a]); // От большего к меньшему

  for (const key of sortedBreakpoints) {
    if (width >= size[key]) {
      return cols[key] as number;
    }
  }

  return cols.default || 1;
};

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

    const [columnCount, setColumnCount] = useState(1);

    useEffect(() => {
      const updateColumns = () => setColumnCount(getActiveColumns(columns));
      updateColumns();
      window.addEventListener('resize', updateColumns);
      return () => window.removeEventListener('resize', updateColumns);
    }, [columns]);

    const columnsArray = useMemo(() => {
      const result: React.ReactNode[][] = Array.from({ length: columnCount }, () => []);

      React.Children.forEach(children, (child, index) => {
        if (child !== undefined && child !== null) {
          result[index % columnCount].push(child);
        }
      });
      return result;
    }, [children, columnCount]);

    const gapVal = getRem(gap);

    const containerStyle: VStyle = {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: gapVal,
      padding: mapRem(padding),
      borderRadius: mapRem(radius),
      ...(text && getFont(font[text])),
      ...vStyle
    };

    const columnStyle: VStyle = {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      gap: gapVal,
      minWidth: 0
    };

    return (
      <Styled
        as={as || "div"}
        ref={ref}
        vStyle={containerStyle}
        {...rest}
      >
        {columnsArray.map((colChildren, colIdx) => (
          <Styled key={colIdx} as="div" vStyle={columnStyle}>
            {colChildren}
          </Styled>
        ))}
      </Styled>
    );
  }) as PolymorphicComponent<VMasonryProps>;

VMasonry.displayName = "vMasonry";