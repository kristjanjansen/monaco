export const formatMarkdownTable = data => {
  const keys = Object.keys(data[0]);
  const longestCell = Math.max(
    ...keys.map(k => String(k).length),
    ...data.map(d => Math.max(...Object.values(d).map(v => String(v).length)))
  );
  const header = keys.map(k => k.padEnd(longestCell)).join("|");
  const separator = keys
    .map(_ =>
      Array.from({ length: longestCell })
        .map(_ => "-")
        .join("")
    )
    .join("|");
  const content = data.map(d =>
    Object.values(d)
      .map(v => String(v).padEnd(longestCell))
      .join("|")
  );
  return [header, separator, ...content].join("\n");
};

export const pascalCase = str =>
  str
    .match(/[a-z]+/gi)
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join("");
