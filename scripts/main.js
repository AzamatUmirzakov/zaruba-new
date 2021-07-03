// базовые стили для уведомлений
let popup = document.querySelector(".popup-notification");
let form = document.querySelector(".main-form");
setInterval(() => {
  if (!window.matchMedia("(max-width: 375px").matches) {
    popup.style.top =
      form.getBoundingClientRect().top +
      window.pageYOffset -
      popup.offsetHeight -
      48 +
      "px";
  } else {
    popup.style.top = "120px";
  }
}, 100);
popup.dataset.animating = false;

// функция для показа уведомлений
function show_popup(form, ...content) {
  if (popup.dataset.animating == "false") {
    popup.innerHTML = "";
    popup.append(...content);
    popup.style.right =
      document.documentElement.clientWidth -
      form.getBoundingClientRect().right +
      "px";
    popup.style.minWidth = form.offsetWidth + "px";
    popup.dataset.animating = "true";
    setTimeout(() => {
      popup.style.right = "-200%";
      popup.dataset.animating = "false";
    }, 3000);
  }
}

// функция для проверки авторизационных данных
function is_valid_authorization(input) {
  return false;
}

// проверка данных перед авторизацией
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !is_valid_authorization({
      nickname: form.nickname.value,
      password: form.password.value,
    })
  ) {
    let img = document.createElement("img");
    img.src = "assets/invalid.svg";
    show_popup(form, "Неверно введен никнейм или пароль", img);
    for (let input of form.querySelectorAll("input")) {
      input.style.borderColor = "#F91212";
    }
  }
});

// оверлей для поля с паролем, чтобы вместо обычных точек показывалось "*"
// let input_overlay = document.querySelector(".input-overlay");
// input_overlay.addEventListener("click", () => {
//   input_overlay.previousElementSibling.focus();
//   input_overlay.value = Array(input_overlay.previousElementSibling.value.length)
//     .fill("*")
//     .join("");
// });

// input_overlay.previousElementSibling.addEventListener("input", () => {
//   input_overlay.value = Array(input_overlay.previousElementSibling.value.length)
//     .fill("*")
//     .join("");
// });

// функционал кнопок для показа форм авторизации и восстановления пароля
let forgot_password_button = document.querySelector(".forgot-password-button");

forgot_password_button.addEventListener("click", () => {
  document.querySelector(".main-form").style.display = "none";
  document.querySelector(".forgot-password-form").style.display = "flex";
});

let remembered_password_button = document.querySelector(
  ".remembered-password-button"
);

remembered_password_button.addEventListener("click", () => {
  document.querySelector(".main-form").style.display = "";
  document.querySelector(".forgot-password-form").style.display = "none";
});

// проверка электронной почты
function is_valid_email(mail) {
  return false; // менять здесь
}
let reset_password_form = document.querySelector("form.forgot-password-form");
reset_password_form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (is_valid_email(reset_password_form.value)) {
    show_popup(
      reset_password_form,
      "Вам на почту выслано письмо с новым паролем"
    );
  } else {
    show_popup(reset_password_form, "Неверно введена почта");
  }
});
