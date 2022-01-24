const formtNumber = (value: number | string, decimal?: number): string => {
  const raw = Number(value);
  if (raw > 999 && raw < 1000000) {
    return `${(raw / 1000).toFixed(decimal || 1)}K`; // convert to K for number from > 1000 < 1 million
  }
  if (raw > 1000000) {
    return `${(raw / 1000000).toFixed(decimal || 1)}M`; // convert to M for number from > 1 million
  }
  if (raw < 900) {
    return `${raw}`; // if value < 1000, nothing to do
  }
  return `${raw}`; // if value < 1000, nothing to do
};

export default formtNumber;
