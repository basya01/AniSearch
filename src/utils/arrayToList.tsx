export function arrayToList(array: any, key: any = null): string[] {
  return array.map((item: any, index: any) =>
    key
      ? index + 1 === array.length
        ? item[key]
        : item[key] + ', '
      : index + 1 === array.length
      ? item
      : item + ', ',
  );
}
