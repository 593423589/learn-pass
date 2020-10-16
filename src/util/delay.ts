export const delay = async (duration: number) => {
  return new Promise(resolve => {
    let timer: Timeout;
    timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, duration);
  });
};
