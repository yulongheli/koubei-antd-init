export const sillyRandomId = () => {
  const now = new Date().getTime().toString();
  return now.slice(-7) + Math.floor(Math.random() * 90 + 10);
}