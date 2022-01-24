const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function config() {
  // modern Chrome requires { passive: false } when adding event
  let passiveSupported = false;

  try {
    const options = {
      get passive() {
        // This function will be called when the browser
        //   attempts to access the passive property.
        passiveSupported = true;
        return false;
      },
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch (err) {
    passiveSupported = false;
  }
  const wheelOpt = passiveSupported ? { passive: false } : false;
  const wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  return { wheelOpt, wheelEvent };
}

// call this to Disable
export function disableScroll() {
  const { wheelOpt, wheelEvent } = config();
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
export function enableScroll() {
  const { wheelOpt, wheelEvent } = config();
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}
