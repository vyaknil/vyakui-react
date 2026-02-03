"use client";
import React, { useMemo, useInsertionEffect } from 'react';
import { generateHash, createCSS } from './engine';
import { useVRegistry } from './vRegistry';

export const Styled = <C extends React.ElementType = 'div'>({
  as, vStyle, className, ...props
  }: { as?: C; vStyle?: any } & React.ComponentPropsWithoutRef<C>) => {
  const Component = as || 'div';
  const register = useVRegistry();

  const { hash, css } = useMemo(() => {
    if (!vStyle) return { hash: '', css: '' };
    const h = generateHash(vStyle);
    const c = createCSS(h, vStyle);
    return { hash: h, css: c };
  }, [vStyle]);

  if (typeof window === 'undefined' && register && hash && css) register(hash, css);

  useInsertionEffect(() => {
    if (register && hash && css) register(hash, css);
  }, [hash, css, register]);

  return <Component className={`${hash} ${className || ''}`.trim()} {...props} />;
};