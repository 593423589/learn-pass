export const setItem = (name: string, value: unknown) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getItem = (name: string) =>
  JSON.parse(JSON.stringify(localStorage.getItem(name)));

export const removeItem = (name: string) => localStorage.removeItem(name);
