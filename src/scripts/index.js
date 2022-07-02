/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav-links')[0];
toggleButton.addEventListener('click', () => {
	toggleButton.classList.toggle('open');
	navbarLinks.classList.toggle('active');
});

const app = new App({
	button: document.querySelector('#menu'),
	drawer: document.querySelector('#navbar'),
	content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
	app.renderPage();
});

window.addEventListener('load', () => {
	app.renderPage();
	swRegister();
});

const favouriteButtons = document.querySelectorAll('.favourite-button');
favouriteButtons.forEach((button) => {
	button.addEventListener('click', favouriteClick);
});
function favouriteClick() {
	let button = this;
	button.classList.add('clicked');
}
