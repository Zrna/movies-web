/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
export type WithNestedKeysOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? // @ts-ignore
      Key | `${Key}.${WithNestedKeysOf<ObjectType[Key]>}`
    : Key;
}[keyof ObjectType & (string | number)];
