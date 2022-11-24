const pluralizedWord = (word: string, plural?: string) => {
  if (plural) {
    return plural;
  }
  const lastChar = word.substring(word.length - 1);
  switch (lastChar) {
    case "y": {
      return word.substring(0, word.length - 1) + "ies";
    }
    case "s":
    case "x": {
      return word + "es";
    }
    default: {
      return word + "s";
    }
  }
};
export const pluralize = (n: number, word: string, plural?: string) =>
  n === 1 ? word : pluralizedWord(word, plural);

export const countOf = (n: number, item: string, plural?: string) =>
  `${n} ${pluralize(n, item, plural)}`;
