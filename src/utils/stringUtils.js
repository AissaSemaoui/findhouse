const splitParagraphByKeywords = (paragraph, numKeywords) => {
  const words = paragraph.split(/\s+/);
  const firstPart = words.slice(0, numKeywords).join(" ");
  const secondPart = words.slice(numKeywords).join(" ");
  return [firstPart, secondPart];
};

export { splitParagraphByKeywords };
