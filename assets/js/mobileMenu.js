// Controlar a abertura e fechamento do Mobile menu

const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const mobileMenu = document.querySelector("#mobile-menu");

openMenu.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});

closeMenu.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});