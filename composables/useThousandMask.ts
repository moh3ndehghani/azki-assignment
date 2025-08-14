export const useThousandMask = (): string => {
  const formatNumber = (number: number, exponent: number = 2) => {
    if (isNaN(number)) {
      return "Invalid number";
    }

    const num: number = parseFloat(number);
    if (!isFinite(num)) {
      return "Invalid number";
    }

    const formattedNumber: string = num.toFixed(exponent).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
  };

  return {
    formatNumber,
  };
};
