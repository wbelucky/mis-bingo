export type Result<T, E> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  public readonly value: T;
  constructor(value: T) {
    this.value = value;
  }
  public isOk(): this is Ok<T, E> {
    return true;
  }
  public isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E> {
  public readonly value: E;
  constructor(value: E) {
    this.value = value;
  }
  public isOk(): this is Ok<T, E> {
    return false;
  }
  public isErr(): this is Err<T, E> {
    return true;
  }
}

export const ok = <T, E>(value: T): Result<T, E> => {
  return new Ok(value);
};
export const err = <T, E>(err: E): Result<T, E> => {
  return new Err(err);
};

// const isTrue = (b: boolean): Result<number, string> => {
//   return b ? ok(1) : err("string");
// };

// const test = () => {
//   const a = isTrue(false);
//   if (a.isErr()) {
//     console.log(a.value); // string;
//     return;
//   }
//   a.value; // number;
// };
