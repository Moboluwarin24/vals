
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const caesarShift = (text: string, shift: number): string => {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      let base = code >= 65 && code <= 90 ? 65 : 97;
      return String.fromCharCode(((code - base + shift + 26) % 26) + base);
    }
    return char;
  }).join('');
};
