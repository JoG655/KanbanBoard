export function checkTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
