import * as icons from '../assets/icons';
import borders from './borders';
import { breakpoints } from './breakpoints';
import { alerts, alphas, palette } from './colors';
import radii from './radii';
import sizes from './sizes';
import space from './space';
import typography from './typography';

export * from './breakpoints';

const themeUiColors = {
  background: palette.black,
  text: palette.white,
  primary: palette.white,
};

export const colors = {
  ...alerts,
  ...alphas,
  ...palette,
  ...themeUiColors,
};

export { borders, breakpoints, radii, sizes, space };

export const fonts = typography.fonts;
export const fontWeights = typography.fontWeights;
export const text = typography.variants;

export type Color = keyof typeof colors;
export type Icon = keyof typeof icons;
export type TextVariant = keyof typeof text;
