import { fonts, fontStyles, fontWeights } from '../fonts';

export default {
  'label-button': {
    fontFamily: fonts.body,
    fontSize: '16px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights['semi-bold'],
    lineHeight: '24px',
  },
  'label-link': {
    fontFamily: fonts.body,
    fontSize: '16px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.medium,
    lineHeight: '20px',
    textDecorationLine: 'underline',
  },
  'label-uppercase': {
    fontFamily: fonts.body,
    fontSize: '12px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights['semi-bold'],
    lineHeight: '16px',
    textTransform: 'uppercase' as any,
  },
};
