export const delay = async (duration: number) => {
  await new Promise(resolve => {
    let timer: any = null;
    timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, duration);
  });
};
