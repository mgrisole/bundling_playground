function strEnum<T extends string>(o: T[]): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const KeyboardsNames = strEnum([
  "azerty",
  "qwerty",
]);

export const keyboards: {[key in keyof typeof KeyboardsNames]: string[]} = {
  azerty: ["azertyuiop", "qsdfghjklm", "wxcvbn"],
  qwerty: ["qwertyuiop", "asdfghjklz", "xcvbnm"],
};
