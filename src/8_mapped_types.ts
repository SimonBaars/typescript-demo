// SameType is a mapped type that takes an object type and returns an object type with the same keys and values.
type SameType<T> = {
  [K in keyof T]: T[K];
};

const sample1: SameType<{ first: string; second: number }> = {
  first: "wibble",
  second: 1234,
};
console.log(sample1);

// InstilReadOnly is a mapped type that takes an object type and returns an object type with the same keys and values, but with all properties readonly.
type InstilReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
const sample2: InstilReadOnly<{ first: string; second: number }> = {
  first: "wibble",
  second: 1234,
};
console.log(sample2);

// InstilMutable is a mapped type that takes an object type and returns an object type with the same keys and values, but with all properties mutable.
type InstilMutable<T> = {
  -readonly [K in keyof T]: T[K];
};
const sample3: InstilMutable<{
  readonly first: string;
  readonly second: number;
}> = {
  first: "wibble",
  second: 1234,
};
console.log(sample3);

// InstilPartial is a mapped type that takes an object type and returns an object type with the same keys and values, but with all properties optional.
type InstilPartial<T> = {
  [K in keyof T]?: T[K];
};
const sample4: InstilPartial<{ first: string; second: number }> = {
  first: "wibble",
};
console.log(sample4);

// InstilRequired is a mapped type that takes an object type and returns an object type with the same keys and values, but with all properties required.
type InstilRequired<T> = {
  [K in keyof T]-?: T[K];
};
const sample5: InstilRequired<{ first?: string; second?: number }> = {
  first: "wibble",
  second: 1234,
};
console.log(sample5);

// Other is a conditional type that takes a type T and returns a type that is T if T is a string, or never otherwise.
// never is a type that can never be instantiated.
type Other<T> = T extends string ? T : never;

// AliasedKeys is a mapped type that takes an object type and returns an object type with the same keys and values, but with all keys aliased to Other.
type AliasedKeys<T> = {
  [K in keyof T as Other<K>]: T[K];
};
const sample6: AliasedKeys<{ first: string; second: number }> = {
  first: "wibble",
  second: 1234,
};
console.log(sample6);

// UserDataAccessors is a mapped type that takes an object type and returns an object type with the same keys and values, but with all keys prefixed with get.
export type UserDataAccessors = {
  [K in keyof UserData as `get${Capitalize<K>}`]: () => UserData[K];
};
const sample7: UserDataAccessors = {
  getName: () => "wibble",
  getAge: () => 1234,
  getRegistered: () => true,
};
console.log(sample7);

type StringNumberToggle<T extends string | number> = T extends string
  ? number
  : string;
const sample8: StringNumberToggle<string> = 1234;
console.log(sample8);
// Note, this is all happening at compile time. We are using types, not values.

// StringifyFields is a mapped type that takes an object type and returns an object type with the same keys and values, but with all values stringified.
type StringifyFields<T> = {
  [K in keyof T]: T[K] extends Function ? T[K] : string;
};
const sample9: StringifyFields<{
  first: string;
  second: () => void;
}> = {
  first: "wibble",
  second: () => "wobble",
};
console.log(sample9);

// UnaryMethodNames is a mapped type that takes an object type and returns a union of all method names that take a single parameter.
type UnaryMethodNames<T> = {
  [K in keyof T]: T[K] extends (left: any) => any ? K : never;
}[keyof T];
const sample10: UnaryMethodNames<{
  first: string;
  second: (left: number) => number;
  third: (left: string, right: number) => string;
}> = "second";
console.log(sample10);

// UnaryMethodInputs is a mapped type that takes an object type and returns a union of all parameter types for methods that take a single parameter.
type UnaryMethodInputs<T, M extends UnaryMethodNames<T>> = {
  [K in keyof T]: T[K] extends (value: infer U) => any ? U : never;
}[keyof T];
const sample11: UnaryMethodInputs<
  {
    first: string;
    second: (left: number) => number;
    third: (left: string, right: number) => string;
  },
  "second"
> = 1234;
console.log(sample11);
