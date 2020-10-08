export const delay = async (duration: number) => {
  return new Promise(resolve => {
    let timer: any = null;
    timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, duration);
  });
};
