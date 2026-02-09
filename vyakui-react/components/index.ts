import React from "react";
import { VStyle } from '../styled/engine'


export const transitionDuration: string = ".333s";
export const transitionFunction: string = "cubic-bezier(0.4, 0, 0.2, 1)";

export type BaseStyledProps<C extends React.ElementType, P = {}> =
  P &
  {
    as?: C;
    vStyle?: VStyle;
    children?: React.ReactNode;
  } &
  Omit<React.ComponentPropsWithoutRef<C>, keyof P | 'as' | 'vStyle'>;

export interface PolymorphicComponent<P = {}> {
  <C extends React.ElementType = 'div'>(
    props: BaseStyledProps<C, P> & { ref?: React.Ref<React.ComponentRef<C>> }
  ): React.ReactElement | null;

  displayName?: string;
}

export const disabledStyle: VStyle = {
  opacity:       "0.4",
  pointerEvents: "none",
  cursor:        "default"
}