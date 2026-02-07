export function normalizeWin32(raw) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      name: line,
      type: "win32",
    }));
}

export function normalizeStore(raw) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => ({
      name: line,
      type: "store",
    }));
}
