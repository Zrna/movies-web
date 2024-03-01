import { Fragment } from 'react';

export function splitStringToNewLine(str: string) {
  return str.split('\n').map((value, i) => (
    <Fragment key={value + i}>
      {value} <br />
    </Fragment>
  ));
}

export function pluralize(noun: string, length: number) {
  return length === 1 ? noun : `${noun}s`;
}
