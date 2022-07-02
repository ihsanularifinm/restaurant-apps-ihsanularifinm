import '../components/hero';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
	async render() {
		return `
			<hero-header></hero-header>
			<section class="container">
				<div class="title">
					<h1>Explore Restaurant</h1>
				</div>
				<div id="dishes" class="cards"></div>
			</section>
		`;
	},

	async afterRender() {
		const restaurant = await RestaurantSource.listRestaurant();
		const restaurantContainer = document.querySelector('#dishes');
		restaurant.forEach((restaurants) => {
			restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurants);
		});
	},
};

export default Home;
