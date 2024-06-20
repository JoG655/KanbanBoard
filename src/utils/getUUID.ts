function getRandomID(length = 10) {
  const characterPool =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return [...Array(length)].reduce((acc: string, _, index) => {
    return index === 0
      ? characterPool.charAt(
          Math.floor(Math.random() * (characterPool.length - 11)),
        )
      : acc +
          characterPool.charAt(
            Math.floor(Math.random() * characterPool.length),
          );
  }, "");
}

export function getUUID() {
  return getRandomID();
}
