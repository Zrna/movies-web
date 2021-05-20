import * as icons from '../assets/icons';
import borders from './borders';
import { alphas, palette } from './colors';
import radii from './radii';
import sizes from './sizes';
import space from './space';
import typography from './typography';

const themeUiColors = {
  background: palette.white,
  text: palette.black,
  primary: palette.black,
};

export const colors = {
  ...alphas,
  ...palette,
  ...themeUiColors,
};

export { borders, radii, sizes, space };

export const fonts = typography.fonts;
export const fontWeights = typography.fontWeights;
export const text = typography.variants;

export type Color = keyof typeof colors;
export type Icon = keyof typeof icons;
export type TextVariant = keyof typeof text;
