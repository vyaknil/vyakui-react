# vyakUI

#### React

## Installation

```bash
npm install vyakui-react
```

### Root layout

#### React

```tsx
import { HomePage } from './pages/HomePage';
import { VRegistry } from 'vyakui-react';
import "vyakui-react/global.css";


export const App = () => (
  <VRegistry>
    <HomePage/>
  </VRegistry>
);
```

#### Next.js

```tsx
import { VRegistry } from 'vyakui-react';
import "vyakui-react/global.css";


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

### global.css

Reset default styles

## Types

**VStyle** = `CSSProperties & { [key: string]: VStyle }` <br>
**Color** = `"gray1/2/3/4/5" | "accent1/2/3/4/5" | "success/warning/error/info"` <br>
**Colors** = `[Color, Color]` <br>
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
**getFont** — return `VStyle` from `font` entry <br>

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
| `as`       | `ElementType` | `"div"`     | HTML tag or component to render.                     |
| `vStyle`   | `VStyle`      | `undefined` | CSS object supporting nesting and at-rules.          |
| `ref`      | `Ref`         | `undefined` | React refs                                           |
| `...props` | `Attributes`  | -           | any valid attribute for the element defined in `as`. |

## VLink Component

### Props

```ts
/* Types */
type Target = "_blank" | "_self" | "_top" | "_parent";
type Variant = "default" | "underline" | "background";
```

extends Styled Props

| Prop        | Type                | Default              | Description              |
|:------------|:--------------------|:---------------------|:-------------------------|
| `disabled`  | `boolean`           | `false`              | disables link            |
| `colorText` | `Colors`            | `["gray1", "gray2"]` | default and hover colors |
| `href`      | `string`            | `undefined`          | link href                |
| `target`    | `Target`            | `"_self"`            | link target              |
| `onClick`   | `MouseEventHandler` | `undefined`          | onClick event            |
| `variant`   | `Variant`           | `"default"`          | link variant             |
| `size`      | `Size`              | `"default"`          | link size                |

for `"background"` variant use second color in `colorText` for background color on hover

#### Next.js Link

```tsx
import Link from "next/link";
import { VLink } from "vyakui-react";


<VLink as={Link} href="https://nextjs.org">
  Next.js Link
</VLink>
```

## VFlex Component

### Props

```ts
/* Types */
type Direction = "row" | "row-reverse" | "column" | "column-reverse";
type Wrap = "nowrap" | "wrap" | "wrap-reverse";
type Align = "flex-start" | "flex-end" | "center";
type Justify = Align | "space-between" | "space-around" | "space-evenly";
```

extends Styled Props

| Prop        | Type        | Default        | Description         |
|:------------|:------------|:---------------|:--------------------|
| `inline`    | `boolean`   | `false`        | inline-flex or flex |
| `direction` | `Direction` | `"row"`        | flex direction      |
| `wrap`      | `Wrap`      | `"nowrap"`     | flex wrap           |
| `align`     | `Align`     | `"flex-start"` | align items         |
| `justify`   | `Justify`   | `"flex-start"` | justify content     |
| `gap`       | `number`    | `0`            | gap between items   |
| `padding`   | `Numbers`   | `[0]`          | padding             |
| `radius`    | `Numbers`   | `[0]`          | border radius       |
| `text`      | `Font`      | `undefined`    | font style          |

## VButton Component

### Props

```ts
/* Types */
type Variant = "default" | "outline";
```

extends Styled Props

| Prop        | Type      | Default              | Description                         |
|:------------|:----------|:---------------------|:------------------------------------|
| `disabled`  | `boolean` | `false`              | disables button                     |
| `variant`   | `Variant` | `"default"`          | button variant                      |
| `size`      | `Size`    | `"default"`          | button size                         |
| `colorBg`   | `Colors`  | `["gray1", "gray2"]` | background default and hover colors |
| `colorText` | `Colors`  | `["gray5", "gray5"]` | text default and hover colors       |

`colorBg` does't work in `outline` variant
