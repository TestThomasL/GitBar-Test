function compareArraysOfObjects<T, P>(arr1: T[], arr2: P[]) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export default compareArraysOfObjects;
