export const getCelsius = (value: number) => {
  const result = (value - 32) * 5 / 9;

  return result;
};

export const getFahrenheit = (value: number) => {
  const result = (value * 9 / 5) + 32;

  return result;
}
