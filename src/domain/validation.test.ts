import { TypeValidator, isString, isNumber, isObj } from "./validate";

describe("Typescript Validator", () => {
  it("isObject not valid", () => {
    type Hoge = { hoge: { hoge: string; fuga: number }; fuga: string };

    const v = new TypeValidator<Hoge>(
      isObj({
        hoge: isObj({ hoge: isString, fuga: isNumber }),
        fuga: isString,
      })
    );
    const a = 1 as unknown;
    expect(v.isOk(a)).toBe(false);
  });
  it("isObject valid", () => {
    type Hoge = { hoge: { hoge: string; fuga: number }; fuga: string };

    const v = new TypeValidator<Hoge>(
      isObj({
        hoge: isObj({ hoge: isString, fuga: isNumber }),
        fuga: isString,
      })
    );
    const a = { hoge: { hoge: "dada", fuga: 1 }, fuga: "aaa" } as unknown;
    expect(v.isOk(a)).toBe(true);
  });
  it("isObject error", () => {
    type Hoge = { hoge: { hoge: string; fuga: number }; fuga: string };

    const v = new TypeValidator<Hoge>(
      isObj({
        hoge: isObj({ hoge: isString, fuga: isNumber }),
        fuga: isString,
      })
    );
    const a = { hoge: { hoge: "dada", fuga: "baba" }, fuga: "aaa" } as unknown;
    v.isOk(a);
    const res = v.getResult();
    expect(res && !res.valid && (res.errorType as any).hoge.fuga).toBe("not_number");
  });
});
