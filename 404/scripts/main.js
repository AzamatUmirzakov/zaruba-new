let img = document.querySelector(".main-inside img");

setInterval(() => {
  img.style.left = `calc(50% - ${img.offsetWidth / 2 - 15}px)`;
  // img.style.top = `calc(50% - ${img.offsetHeight / 2}px)`;
}, 100);
