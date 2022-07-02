import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
	async render() {
		return `
			<section class="container">
				<div class="title">
					<h1>Favorite List</h1>
				</div>
				<div id="dishes" class="cards"></div>
			</section>
		`;
	},

	async afterRender() {
		const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
		const restaurantsContainer = document.querySelector('#dishes');
		if (restaurants.length === 0) {
			restaurantsContainer.innerHTML = 'Belum ada restoran yang difavoritkan';
		}
		restaurants.forEach((restaurant) => {
			restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
		});
	},
};

export default Favorite;
