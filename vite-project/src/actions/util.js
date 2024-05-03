export const createLoadObserver = (handler) => {
  let waiting = 0;

  const onload = (el) => {
    waiting++;
    el.addEventListener("load", () => {
      waiting--;
      if (waiting === 0) {
        handler();
      }
    });
  };

  return onload;
};

// how to use:
// <img use:onload src="https://place-hold.it/320x120" alt="placeholder" />
