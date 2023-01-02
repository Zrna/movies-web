import { fonts, fontStyles, fontWeights } from '../fonts';

export default {
  'label-m': {
    fontFamily: fonts.body,
    fontSize: '16px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.medium,
    lineHeight: '24px',
    textTransform: 'uppercase' as any,
  },
  'label-s': {
    fontFamily: fonts.body,
    fontSize: '14px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.medium,
    lineHeight: '16px',
    textTransform: 'uppercase' as any,
  },
  'label-xs': {
    fontFamily: fonts.body,
    fontSize: '12px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.medium,
    lineHeight: '24px',
    textTransform: 'uppercase' as any,
  },
};
