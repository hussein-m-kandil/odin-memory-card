/**
 * Returns new array with same original items in a shuffled order
 *
 * @param {any[]} arr
 * @returns {any[]}
 */
export function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    const randIndexBehind = Math.floor(Math.random() * i);
    [newArr[randIndexBehind], newArr[i]] = [newArr[i], newArr[randIndexBehind]];
  }
  return newArr;
}

export default shuffleArray;
