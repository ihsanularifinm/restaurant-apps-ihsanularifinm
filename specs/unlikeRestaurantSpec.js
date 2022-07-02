import FavoriteRestaurantIdb from '../src/scripts/data/favoriterestaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
	const addLikeButtonContainer = () => {
		document.body.innerHTML = '<div id="likeButtonContainer"></div>';
	};

	beforeEach(() => {
		addLikeButtonContainer();
	});

	//membuat test menampilkan tombol sukai
	it('should show the like button when the restaurant has not been liked before', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
	});
	//membuat test nemapilkan tombol batal sukai
	it('should not show the unlike button when the restaurant has not been liked before', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
	});
	//menekan widget dan restoran tersimpan di daftar restoran yang disukai
	it('should be able to like the restaurant', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

		expect(restaurant).toEqual({ id: 1 });
		FavoriteRestaurantIdb.deleteRestaurant(1);
	});

	//test bila restoran sudah berada di dalam daftar restoran yang disukai, maka kita tidak perlu menambahkannya kembali
	it('should not add a restaurant again when its already liked', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 1 });

		// Tambahkan restoran dengan ID 1 ke daftar restoran yang disukai
		await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
		// Simulasikan pengguna menekan tombol suka restoran
		document.querySelector('#likeButton').dispatchEvent(new Event('click'));
		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([{ id: 1 }]);

		FavoriteRestaurantIdb.deleteRestaurant(1);
	});

	//test Data restoran tidak memiliki ID
	it('should not add a restaurant when it has no id', async () => {
		await TestFactories.createLikeButtonPresenterWithRestaurant({});

		document.querySelector('#likeButton').dispatchEvent(new Event('click'));

		expect(await FavoriteRestaurantIdb.getAllRestaurant()).toEqual([]);
	});
});
