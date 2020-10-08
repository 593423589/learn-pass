const checkFull = () => {
  return document.fullscreenEnabled && document.webkitIsFullScreen;
};

export default checkFull;
