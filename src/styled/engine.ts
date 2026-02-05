import { CSSProperties } from 'react';


export type VStyle = CSSProperties & {
  [K in `&${string}` | `@${string}`]?: VStyle;
};

export const generateHash = (val: any) => {
  const str = JSON.stringify(val);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 'v-' + Math.abs(hash).toString(36);
};

export const createCSS = (className: string, style: VStyle) => {
  let main = '', nested = '';
  const toKebab = (s: string) => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);

  Object.entries(style).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      if (key.startsWith('@')) {
        nested += `${key} { .${className} { ${Object.entries(value).map(([k, v]) => `${toKebab(k)}: ${v};`).join(' ')} } } `;
      } else {
        const sel = key.includes('&') ? key.replace('&', `.${className}`) : `.${className}${key}`;
        nested += `${sel} { ${Object.entries(value).map(([k, v]) => `${toKebab(k)}: ${v};`).join(' ')} } `;
      }
    } else {
      main += `${toKebab(key)}: ${value}; `;
    }
  });
  return `.${className} { ${main} } ${nested}`;
};