const sortStringArray = <T>(arr: T[] = []): T[] => {
  return arr.sort((a, b) => (a as string).localeCompare(b as string))
};

export default sortStringArray;
