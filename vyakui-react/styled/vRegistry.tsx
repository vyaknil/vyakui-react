"use client";
import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

let useServerInsertedHTML: any = null;
try { useServerInsertedHTML = require('next/navigation').useServerInsertedHTML; } catch (e) {}

const VRegistryContext = createContext<((h: string, c: string) => void) | null>(null);

export const VRegistry = ({children}: { children: React.ReactNode }) => {
  const [inserted] = useState(() => new Map<string, string>());
  const serverRules = useRef<string[]>([]);

  const register = useCallback((hash: string, css: string) => {
    const existing = inserted.get(hash);
    if (existing === css) return;

    inserted.set(hash, css);

    if (typeof window === 'undefined') {
      serverRules.current.push(css);
    } else {
      const oldStyle = document.querySelector(`style[data-vui="${hash}"]`);
      if (oldStyle) {
        oldStyle.remove();
      }

      const style = document.createElement('style');
      style.setAttribute('data-vui', hash);
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  }, [inserted]);

  if (useServerInsertedHTML) {
    useServerInsertedHTML(() => {
      if (serverRules.current.length === 0) return null;
      const css = serverRules.current.join('\n');
      serverRules.current = [];
      return <style data-vui-ssr dangerouslySetInnerHTML={{__html: css}}/>;
    });
  }

  return (
    <VRegistryContext.Provider value={register}>
      {children}
    </VRegistryContext.Provider>
  );
};

export const useVRegistry = () => useContext(VRegistryContext);