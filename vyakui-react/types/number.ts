// type
export type Numbers = [number] | [number, number] | [number, number, number] | [number, number, number, number];

const rem: number = 0.0625;

// get
export const getRem = (value: number) => `${value * rem}rem`;
export const mapRem = (value: Numbers) => value.map(v => getRem(v)).join(" ");