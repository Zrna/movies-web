export const clickable = {
  cursor: 'pointer',
  // applies to any element with the disabled attribute

  '&[disabled]': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
};
