/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import CONFIG from '../../global/config';

const createRestaurantItemTemplate = (restaurant) => `
	<div class="card">
		<figure>
			<img class="lazyload" data-src="${CONFIG.SMALL_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
			<figcaption>Kota ${restaurant.city}</figcaption>
		</figure>
		<div class="content">
			<p class="rating">⭐️ ${restaurant.rating}</p>
			<h2>${restaurant.name}</h2>
			<p class="description">${restaurant.description}</p>
			<button aria-label="${restaurant.name}" onClick="window.location.href='${`/#/detail/${restaurant.id}`}'">Details</button>
		</div>
	</div>
`;

function categoriesRestaurant(restaurant) {
	return restaurant.categories.map((category) => category.name).join(', ');
}

function foodsRestaurant(restaurant) {
	return restaurant.menus.foods
		.map(
			(food) => `
			<li>${food.name}</li>
		`,
		)
		.join('');
}

function drinksRestaurant(restaurant) {
	return restaurant.menus.drinks
		.map(
			(drink) => `
			<li>${drink.name}</li>
		`,
		)
		.join('');
}

function customerReviews(restaurant) {
	return restaurant.customerReviews
		.map(
			(reviews) => `
			<div class="reviewer-resto">
				<div class="review-header">
					<p class="reviewer-name">${reviews.name}</p>
					<p class="reviewer-date">${reviews.date}</p>
				</div>
				<div class="review-body">${reviews.review}</div>
			</div>
		`,
		)
		.join('');
}

const createRestaurantDetailTemplate = (restaurant) => `
	<div class="detail">
		<div class="img-resto">
			<img src="${CONFIG.MEDIUM_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
		</div>
		<div class="info-resto">
			<h2>${restaurant.name}</h2>
			<p>${restaurant.address}, ${restaurant.city}</p>
			<p>⭐️ ${restaurant.rating} • Categories: ${categoriesRestaurant(restaurant)}</p>
			<p>${restaurant.description}</p>
		</div>
		<div class="menu-resto">
			<h2 class="restaurant-label">Menu's</h2>
			<div>
				<ul>
					<li>Food's</li>
					<ul>${foodsRestaurant(restaurant)}</ul>
				</ul>
				<ul>
					<li>Drink's</li>
					<ul>${drinksRestaurant(restaurant)}</ul>
				</ul>
			</div>
		</div>
		<div class="review-resto">
			<h2 class="restaurant-label">Customer Reviews</h2>
			${customerReviews(restaurant)}
		</div>
		<div class="add-review-form">
			<h1>Bagaiamana menurutmu ?</h1>
			<div id="formReviewContainer">
				<form>
					<label for="inputName">Ketikan nama Anda</label>
					<input type="text" name="nama" id="inputName" placeholder="Masukan nama" />
					<label for="inputReview">Ketikan pendapat Anda</label>
					<textarea name="review" id="inputReview" placeholder="Masukan review"></textarea>
					<button type="submit" id="submitReview">Kirim</button>
				</form>
			</div>
		</div>
	</div>
`;

const createLikeRestaurantButtonTemplate = () => `
	<button aria-label="like this restaurant" id="likeButton" class="like">
		<i class="fa fa-heart-o" aria-hidden="true"></i>
	</button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
	<button aria-label="unlike this restaurant" id="likeButton" class="like">
		<i class="fa fa-heart" aria-hidden="true"></i>
	</button>
`;

export { createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeRestaurantButtonTemplate, createUnlikeRestaurantButtonTemplate };
