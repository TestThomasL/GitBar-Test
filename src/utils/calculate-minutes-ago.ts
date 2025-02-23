const calculateMinutesAgo = (date: number): number =>
  Math.floor((Date.now() - date) / 60000);

export default calculateMinutesAgo;
