/* eslint-disable no-console */
import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import PostReview from '../../utils/post-review';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';

const Detail = {
	async render() {
		return `
			<section class="container">
			<div class="title">
					<h1>Detail Restaurant</h1>
			</div>
			<div id="dishes" class="resto-details"></div>
			<div id="likeButtonContainer"></div>
			</section>
		`;
	},

	async afterRender() {
		const url = UrlParser.parseActiveUrlWithoutCombiner();
		const restaurant = await RestaurantSource.detailRestaurant(url.id);
		console.log(url);
		const restaurantContainer = document.querySelector('#dishes');
		restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

		LikeButtonInitiator.init({
			likeButtonContainer: document.querySelector('#likeButtonContainer'),
			favoriteRestaurant: FavoriteRestaurantIdb,
			restaurant: {
				id: restaurant.id,
				name: restaurant.name,
				pictureId: restaurant.pictureId,
				description: restaurant.description,
				city: restaurant.city,
				rating: restaurant.rating,
			},
		});

		const submitReview = document.querySelector('#submitReview');
		const reviewName = document.querySelector('#inputName');
		const reviewContent = document.querySelector('#inputReview');

		submitReview.addEventListener('click', async (e) => {
			e.preventDefault();
			await PostReview(url, reviewName.value, reviewContent.value);

			reviewName.value = '';
			// reviewInput.value = '';
		});
	},
};

export default Detail;
