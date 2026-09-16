export const sql = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce((acc, s, i) => acc + s + (values[i] ?? ""), "");
