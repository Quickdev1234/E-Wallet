export const formatCardNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  return cleaned.slice(0, 16);
};

export const formatExpiryDate = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 6) {
    const month = cleaned.slice(0, 2);
    const year = cleaned.slice(2, 6);
    return `${month}/${year}`;
  }
  return cleaned;
};

// DOB: 2025-01-25T00:00:00.000Z

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
