# vyakUI

#### React

## Installation

```bash
npm install vyakui-react
```

### Root layout

#### React

```tsx
import { VRegistry } from 'vyakui-react';
import { HomePage } from './pages/HomePage';


export const App = () => (
  <VRegistry>
    <HomePage/>
  </VRegistry>
);
```

#### Next.js

```tsx
import { VRegistry } from 'vyakui-react';


export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <VRegistry>{children}</VRegistry>
    </body>
    </html>
  );
}
```

## Types

**VStyle** = `CSSProperties & { [key: string]: CSSProperties }` <br>
**Color** = `"gray1/2/3/4/5" | "accent1/2/3/4/5" | "success/warning/error/info"` <br>
**Font** = `"heading1/2/3/4/5/6" | "body1/2/3/4/5/6"` <br>
**Numbers** = `[number] | [number, number] | [number, number, number] | [number, number, number, number]` <br>
**Size** = `"default" | "xs" | "sm" | "md" | "lg" | "xl"` <br>

## Objects

**color** — value(hex) from `Color` type <br>
**font** — values(family, size, weight) from `Font` type <br>
**size** — value(window width) from `Size` type <br>

## Get

**getRem** — converts `number` in px to **rem** <br>
**mapRem** — converts `Numbers` in px to **rem** string with multiple values (for padding, borderRadius)<br>
**getFont** — return `VStyle` from `size` entry <br>

## Styled component

### Polymorphism (`as` prop)

Use the `as` prop to render any HTML element. TypeScript will automatically enforce the correct attributes for that element.

```tsx
<Styled
  as="a"
  href="https://github.com"
  vStyle={{textDecoration: 'none'}}
>
  GitHub Link
</Styled>
```

### Styling with `vStyle` prop

```tsx
<Styled
  as="button"
  vStyle={{
    padding:         '10px 20px',
    border:          '1px solid #ccc',
    backgroundColor: '#fff',
    transition:      '0.2s',

    // Pseudo-classes
    ':hover': {
      backgroundColor: '#f0f0f0',
      borderColor:     '#999',
    },

    // Media Queries
    '@media (max-width: 768px)': {
      width:   '100%',
      padding: '15px',
    },

    // Nested selectors
    '& span': {
      color: 'red',
    }
  }}
>
  Interactive <span>Button</span>
</Styled>
```

### Props

| Prop       | Type          | Default     | Description                                          |
|:-----------|:--------------|:------------|:-----------------------------------------------------|
| `as`       | `ElementType` | `'div'`     | The HTML tag or component to render.                 |
| `vStyle`   | `VStyle`      | `undefined` | CSS object supporting nesting and at-rules.          |
| `...props` | `Attributes`  | -           | Any valid attribute for the element defined in `as`. |

## VLink Component

### Props

extends Styled Props

| Prop        | Type      | Default              | Description                  |
|:------------|:----------|:---------------------|:-----------------------------|
| `disabled`  | `boolean` | `false`              | Enables or disables link     |
| `colorText` | `Colors`  | `["gray1", "gray2"]` | Set default and hover colors |