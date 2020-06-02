// あるクラスのコンストラクタにvalidatorたちを投げたら. メッソドで arg is Tを返してくれる設計にしても良かったかも.
export type ValidationError<T> =
  | (T extends any[]
      ? Array<ValidationResult<T[number]>>
      : T extends Record<string | number, any>
      ? { [P in keyof Partial<T>]: ValidationError<T[P]> }
      : string)
  | string;
export type ValidationResult<T> = { valid: true; value?: T } | { valid: false; errorType: ValidationError<T> };
export type Validator<T> = (arg: unknown) => ValidationResult<T>;
export class TypeValidator<T> {
  private result: ValidationResult<T> | null = null;
  constructor(private readonly validator: (arg: unknown) => ValidationResult<T>) {}
  public isOk(arg: unknown): arg is T {
    this.result = this.validator(arg);
    return this.result.valid;
  }
  public getError(): ValidationError<T> | null {
    if (!this.result) return null;
    return this.result.valid ? null : this.result.errorType;
  }
  public getErrorString(): string | null {
    const e = this.getError();
    return e ? JSON.stringify(e) : null;
  }
}

export type Int = number;

export const isNumber: Validator<number> = (arg: unknown) =>
  typeof arg === "number" ? { valid: true } : { valid: false, errorType: "not_number" };

export const isInteger = (arg: unknown): ValidationResult<Int> =>
  typeof arg === "number" && Number.isInteger(arg) ? { valid: true } : { valid: false, errorType: "not_integer" };

export const isNatural = (arg: unknown): ValidationResult<Int> =>
  new TypeValidator(isInteger).isOk(arg) && arg >= 0 ? { valid: true } : { valid: false, errorType: "not_natural" };

export const isNaturalMax = (max: number) => (arg: unknown): ValidationResult<Int> =>
  new TypeValidator(isNatural).isOk(arg) && arg <= max
    ? { valid: true }
    : { valid: false, errorType: "not_natural_in_max_errorType" };

export const isString = (arg: unknown): ValidationResult<string> =>
  typeof arg === "string" ? { valid: true } : { valid: false, errorType: "not_string" };

export const isStringMaxLen = (maxLen: number) => (arg: unknown): ValidationResult<string> =>
  typeof arg === "string" && arg.length <= maxLen
    ? { valid: true }
    : { valid: false, errorType: "not_string_in_max_len" };

export const isBoolean: Validator<boolean> = (arg: unknown) =>
  typeof arg === "boolean" ? { valid: true } : { valid: false, errorType: "not_boolean" };

// validatorを元に, objがT型かどうか判定する関数を返す.
export const isObj = <T extends Record<string, any>>(
  validator: { [P in keyof T]: Validator<T[P]> }
): ((obj: unknown) => ValidationResult<T>) => {
  const ret = (obj: unknown): ValidationResult<T> => {
    if (typeof obj !== "object") return { valid: false, errorType: "not_object" };
    if (!obj) return { valid: false, errorType: "is_falsy" };

    const callback = (
      prev: ValidationResult<Record<string, any>>,
      [k, validate]: [keyof T, (u: unknown) => ValidationResult<T[typeof k]>]
    ): ValidationResult<Record<string, any>> => {
      if (!(k in obj)) {
        return { valid: false, errorType: { [k]: "object_has_not_enough_props" } };
      }
      const res = validate((obj as any)[k]) as ValidationResult<T[typeof k]>;
      if (!prev.valid) {
        return {
          valid: false,
          errorType: { ...(prev.errorType as object), ...(res.valid ? {} : { [k]: res.errorType }) },
        };
      }
      if (res.valid) return { valid: true };
      return { valid: false, errorType: { [k]: res.errorType } };
    };

    const v = Object.entries(validator).reduce(callback, { valid: true }) as ValidationResult<T>;
    return v;
  };
  return ret;
};

// TODO:
// export const isArr = <T>(
//   validator: (arg: unknown, parentPropName?: string) => ValidationResult<T>
// ): ((obj: unknown) => ValidationResult<Array<T>>) => {
//   const ret = (obj: unknown): ValidationResult<Array<T>> => {
//     if (!Array.isArray(obj)) return { valid: false, errorType: "not_array" };
//     const ret = obj.reduce(
//       (prev: ValidationResult<any[]>, cur): ValidationResult<any[]> => {
//         const res = validator(cur);
//         if (!prev.valid) {
//           return {
//             valid: false,
//             errorType: res.valid ? prev.errorType : [...(prev.errorType as ValidationError<any>[]), res.errorType],
//           };
//         }
//         if (res.valid) return { valid: true };
//         return { valid: false, errorType: [res.errorType] };
//       },
//       { valid: true }
//     );
//   };
//   return ret;
// };
