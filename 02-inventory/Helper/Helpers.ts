export function calculateSum(arr: number[]) {
  return arr.reduce((total, current) => {
    return total + current;
  }, 0);
}
