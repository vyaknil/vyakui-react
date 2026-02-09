"use client";
import React, { useMemo, useInsertionEffect, forwardRef } from 'react';
import { generateHash, createCSS, VStyle } from './engine';
import { useVRegistry } from './vRegistry';


type StyledProps<C extends React.ElementType> = {
  as?: C;
  vStyle?: VStyle;
} & React.ComponentPropsWithoutRef<C>;

interface StyledComponent {
  <C extends React.ElementType = 'div'>(
    props: StyledProps<C> & { ref?: React.Ref<React.ComponentRef<C>> }
  ): React.ReactElement | null;

  displayName?: string;
}

export const Styled: StyledComponent = forwardRef(
  <C extends React.ElementType = 'div'>(
    {as, vStyle, className, ...props}: StyledProps<C>,
    ref: React.Ref<any>
  ) => {
    const Component = as || 'div';
    const register = useVRegistry();

    const {hash, css} = useMemo(() => {
      if (!vStyle) return {hash: '', css: ''};
      const h = generateHash(vStyle);
      const c = createCSS(h, vStyle);
      return {hash: h, css: c};
    }, [vStyle]);

    if (typeof window === 'undefined' && register && hash && css) {
      register(hash, css);
    }

    useInsertionEffect(() => {
      if (register && hash && css) register(hash, css);
    }, [hash, css, register]);

    return (
      <Component
        {...props}
        ref={ref}
        className={`${hash} ${className || ''}`.trim()}
      />
    );
  }
) as any;

Styled.displayName = 'styled';