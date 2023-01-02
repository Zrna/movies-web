import { fonts, fontStyles, fontWeights } from '../fonts';

export default {
  'title-xxl': {
    fontFamily: fonts.body,
    fontSize: '72px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.medium,
    lineHeight: '96px',
    textTransform: 'uppercase' as any,
  },
  'title-xl': {
    fontFamily: fonts.body,
    fontSize: '52px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.normal,
    lineHeight: '72px',
    textTransform: 'uppercase' as any,
  },
  'title-l': {
    fontFamily: fonts.body,
    fontSize: '36px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.normal,
    lineHeight: '56px',
    textTransform: 'uppercase' as any,
  },
  'title-m': {
    fontFamily: fonts.body,
    fontSize: '24px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.normal,
    lineHeight: '40px',
    textTransform: 'uppercase' as any,
  },
};
