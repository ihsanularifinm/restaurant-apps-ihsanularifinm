const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
	I.amOnPage('/#/favorite');
});

Scenario('1 showing empty liked restaurant', async ({ I }) => {
	// I.seeElement('.cards');
	I.see('Belum ada restoran yang difavoritkan', '.cards');
});

Scenario('2 liking one restaurant', async ({ I }) => {
	I.see('Belum ada restoran yang difavoritkan', '.cards');

	I.amOnPage('/');

	I.seeElement('.card');

	const firstRestaurant = locate('.card .content h2').first();
	const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
	I.click('.card .content button');

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.card');

	const likedRestaurantName = await I.grabTextFrom('.card .content h2');

	assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('3 unliking one restaurant', async ({ I }) => {
	I.see('Belum ada restoran yang difavoritkan', '.cards');

	I.amOnPage('/');

	I.seeElement('.card');

	const firstRestaurant = locate('.card .content h2').first();
	const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
	I.click('.card .content button');

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');
	I.seeElement('.card');

	const likedRestaurantName = await I.grabTextFrom('.card .content h2');

	assert.strictEqual(firstRestaurantName, likedRestaurantName);

	I.click(locate('.card .content button').first());

	I.seeElement('#likeButton');
	I.click('#likeButton');

	I.amOnPage('/#/favorite');

	I.dontSeeElement('.card');
});

Scenario('4 adding one customer review', async ({ I }) => {
	I.see('Belum ada restoran yang difavoritkan', '.cards');

	I.amOnPage('/');

	I.seeElement('.card');
	I.click('.card .content button');

	I.seeElement('.add-review-form');

	// pause();
	// I.dontSee('Sipolan', '.reviewer-resto');

	I.appendField('#inputName', 'Sipolan');
	I.appendField('#inputReview', "Okein aja ya :')");

	I.seeElement('#submitReview');
	I.click('#submitReview');

	I.see('Sipolan', '.reviewer-resto');

	// pause();
});
