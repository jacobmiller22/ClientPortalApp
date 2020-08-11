const re = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;

export default (numbers) => {
  const invalidNumbers = numbers
    .split(",")
    .map((number) => number.trim())
    .filter((number) => re.test(number));
  if (invalidNumbers.length) {
    return `The following phone numbers are invalid ${invalidNumbers}`;
  }
};
