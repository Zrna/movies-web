import { Fragment } from 'react';

// TODO: write tests for the splitStringToNewLine function
/* c8 ignore start */
export function splitStringToNewLine(str: string) {
  return str.split('\n').map((value, i) => (
    <Fragment key={value + i}>
      {value} <br />
    </Fragment>
  ));
}
/* c8 ignore end */

export function pluralize(noun: string, length: number) {
  return length === 1 ? noun : `${noun}s`;
}
