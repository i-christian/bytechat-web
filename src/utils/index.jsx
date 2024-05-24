export const classNames = (...classes) => classes.filter(Boolean).join(" ");

export const colorForName = (name) => {
  const colors = ["ctp-green", "ctp-pink", "ctp-red", "ctp-peach", "ctp-blue", "ctp-teal"];
  const sum = [...name.toLowerCase()].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
};
