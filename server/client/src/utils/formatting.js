export const bytesToMegabytes = (numBytes) => {
  return (numBytes / 1024 / 1024).toFixed(2);
};

export const formatBytesWhole = (n) => {
  const units = [
    { abb: "B", name: "Byte" },
    { abb: "KB", name: "Kilobyte" },
    { abb: "MB", name: "Megabyte" },
    { abb: "GB", name: "Gigabyte" },
    { abb: "TB", name: "Terabyte" },
    { abb: "PB", name: "Petabyte" },
    { abb: "EB", name: "Exabyte" },
    { abb: "ZB", name: "Zettabyte" },
    { abb: "YB", name: "Yottabyte" },
  ];

  let count = 0;
  while (n > 999) {
    n /= 1000;
    count++;
  }

  if (n.toFixed(0) > 1) {
    return `${n.toFixed(0)} ${units[count].abb}s`;
  }
  return `${n.toFixed(0)} ${units[count].abb}`;
};

export const formatBytesFloating = (n, floatingPoint) => {
  return (n / 1024 / 1024).toFixed(floatingPoint);
};
