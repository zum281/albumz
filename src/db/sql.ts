export const sql = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");

export const toSqliteBool = (b: boolean): number => (b ? 1 : 0);
