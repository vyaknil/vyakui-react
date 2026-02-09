"use client";
import React, { createContext, useContext, useRef, useState } from 'react';


let useServerInsertedHTML: any = null;
try { useServerInsertedHTML = require('next/navigation').useServerInsertedHTML; } catch (e) {}

const VRegistryContext = createContext<((h: string, c: string) => void) | null>(null);

export const VRegistry = ({children}: { children: React.ReactNode }) => {
  const [inserted] = useState(() => new Set<string>());
  const serverRules = useRef<string[]>([]);

  const register = (hash: string, css: string) => {
    if (inserted.has(hash)) return;
    inserted.add(hash);

    if (typeof window === 'undefined') {
      serverRules.current.push(css);
    } else {
      const style = document.createElement('style');
      style.setAttribute('data-vui', hash);
      style.innerHTML = css;
      document.head.appendChild(style);
    }
  };

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