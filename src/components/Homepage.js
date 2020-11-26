import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/Homepage.css';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import Footer from './Footer';

const Homepage = () => {
	const [ items, setItems ] = useState([]);
	const [ cart, setCart ] = useState([]);

	const fetchedClothes = () => {
		fetch('https://fakestoreapi.com/products')
			.then((res) => res.json())
			.then((data) => {
				setItems(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchedClothes();
	}, []);

	// --------men----------
	const men = items.filter((item) => {
		return item.category === 'men clothing';
	});

	// --------women----------
	const women = items.filter((item) => {
		return item.category === 'women clothing';
	});

	// --------electronics----------
	const electronics = items.filter((item) => {
		return item.category === 'electronics';
	});

	// --------jewelery----------
	const jewelery = items.filter((item) => {
		return item.category === 'jewelery';
	});

	const addToCart = (item) => {
		setCart([ ...cart, item ]);

		let currentCart = JSON.parse(localStorage.getItem('cart'));
		if (currentCart !== null || undefined) {
			if (!currentCart.find((items) => items.id === item.id)) {
				let secondCart = [ ...currentCart, item ];
				localStorage.setItem('cart', JSON.stringify(secondCart));
			} else {
				let secondCart = currentCart;
				localStorage.setItem('cart', JSON.stringify(secondCart));
			}
		} else {
			let saveToLocalStore = [ item ];
			localStorage.setItem('cart', JSON.stringify(saveToLocalStore));
		}
		window.location.reload();
	};

	return (
		<main>
			<Header cart={cart} />

			<section className="main">
				<article className="show">
					<h5 id="imgText">New Arrivals</h5>
					<h6>New styles, bright colors, creative designs.</h6>
					<button>Shop Now</button>
				</article>

				<section className="clothes">
					<h4 id="head">Men's Clothing</h4>

					<article className="flex-clothes">
						{items && items.length > 0 ? (
							men.map((item) => {
								return (
									<div key={item.id} style={{ width: 300, maxHeight: 500 }}>
										<img src={item.image} alt="img" />
										<h4>${item.price}</h4>
										<h5>{item.title}</h5>
										<button onClick={() => addToCart(item)}>
											<AiOutlineShoppingCart id="font" />
											Add to cart
										</button>
									</div>
								);
							})
						) : (
							<h5 style={{ fontSize: 25, fontWeight: 'bold' }}>Loading...</h5>
						)}
					</article>
				</section>

				<section className="clothes">
					<h4 id="heads">Women's Clothing</h4>

					<article className="flex-clothes">
						{women.map((item) => {
							if (item.category) {
								return (
									<div key={item.id} style={{ width: 300, maxHeight: 490 }}>
										<img src={item.image} alt="img" />
										<h4>${item.price}</h4>
										<h5>{item.title}</h5>
										<button onClick={() => addToCart(item)}>
											<AiOutlineShoppingCart id="font" />
											Add to cart
										</button>
									</div>
								);
							} else return null;
						})}
					</article>
				</section>

				<section className="clothes">
					<h4 id="head">Electronics</h4>

					<article className="flex-clothes">
						{electronics.map((item) => {
							if (item.category) {
								return (
									<div
										key={item.id}
										style={{ width: 300, maxHeight: 450 }}
									>
										<img src={item.image} alt="img" />
										<h4>${item.price}</h4>
										<h5>{item.title}</h5>
										<button onClick={() => addToCart(item)}>
											<AiOutlineShoppingCart id="font" />
											Add to cart
										</button>
									</div>
								);
							} else return null;
						})}
					</article>
				</section>

				<section className="clothes">
					<h4 id="head">Jewelries</h4>

					<article className="flex-clothes">
						{jewelery.map((item) => {
							if (item.category) {
								return (
									<div
										key={item.id}
										style={{ width: 300, maxHeight: 450 }}
									>
										<img src={item.image} alt="img" id="jwlImg" />
										<h4>${item.price}</h4>
										<h5>{item.title}</h5>
										<button onClick={() => addToCart(item)}>
											<AiOutlineShoppingCart id="font" />
											Add to cart
										</button>
									</div>
								);
							} else return null;
						})}
					</article>
				</section>
			</section>

			<Footer />
		</main>
	);
};

export default Homepage;
