export const sql = (
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | null | undefined)[]
) => strings.reduce((acc, s, i) => acc + s + String(values[i] ?? ""), "");

export const toSqliteBool = (b: boolean): number => (b ? 1 : 0);
