import { fonts, fontStyles, fontWeights } from '../fonts';

export default {
  'headline-h1': {
    fontFamily: fonts.body,
    fontSize: '81px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.bold,
    lineHeight: '100px',
  },
  'headline-h2': {
    fontFamily: fonts.body,
    fontSize: '54px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.bold,
    lineHeight: '68px',
  },
  'headline-h3': {
    fontFamily: fonts.body,
    fontSize: '36px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights.bold,
    lineHeight: '40px',
  },
  'headline-h4': {
    fontFamily: fonts.body,
    fontSize: '24px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights['semi-bold'],
    lineHeight: '30px',
  },
  'headline-h5': {
    fontFamily: fonts.body,
    fontSize: '16px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights['semi-bold'],
    lineHeight: '20px',
  },
  'headline-h6': {
    fontFamily: fonts.body,
    fontSize: '12px',
    fontStyle: fontStyles.normal,
    fontWeight: fontWeights['semi-bold'],
    lineHeight: '16px',
  },
};
