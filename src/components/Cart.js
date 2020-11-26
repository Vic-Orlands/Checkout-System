import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/Cart.css';

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
	const stripePromise = loadStripe(
		'pk_test_51HqmCeLdyr0eJoSeaoGr308HnDf29o9dXLlRm7bnyfWSlJISc2P6UzEZM9MmKbKI4FVFUvHbjxjg0drjv3ZhgsQq00znTTeUDN'
	);

	const [ cartItems, setCartItems ] = useState([]);

	useEffect(() => {
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		if (currentCart !== undefined) {
			setCartItems(currentCart);
		} else {
			return null;
		}
	}, []);

	const getSum = (total, num) => {
		return total + Math.round(num);
	};

	let arrayPrices = cartItems !== null || undefined ? cartItems.map((item) => item.price) : 0;
	let totalAmount = arrayPrices !== 0 ? arrayPrices.reduce(getSum, 0) : 0;

	const deleteItemFromArray = (item) => {
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		const filtered = currentCart.filter((items) => items.id !== item.id);
		localStorage.setItem('cart', JSON.stringify(filtered));
		window.location.reload();
	};

	const onClearAll = () => {
		localStorage.removeItem('cart');
		window.location.reload();
	};

	return (
		<div>
			<Header />
			<section className="modal-content">
				<article>
					<h4>
						My Cart<span> ({cartItems ? cartItems.length : '0'})</span>
					</h4>

					<hr />

					{cartItems !== null || undefined ? (
						cartItems.map((item) => (
							<div key={item.id}>
								<img src={item.image} alt="img" />
								<div>
									<h5>{item.title}</h5>
									<h6>${item.price}</h6>
									<button onClick={() => deleteItemFromArray(item)}>Remove</button>
								</div>
							</div>
						))
					) : (
						<div style={{ height: 450 }}>
							<h5 style={{ color: 'tomato' }}>Your Cart is empty</h5>
						</div>
					)}
				</article>

				<aside>
					<h4>Total Price</h4>

					<hr />

					<div>
						<div>
							<h3>Total:</h3>

							<h3>${totalAmount}</h3>
						</div>

						<button onClick={onClearAll}>Clear Cart</button>
					</div>

					<Elements stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				</aside>
			</section>
			<div className="footer">Built by &copy; chimezieinnocent39@gmail.com</div>;
		</div>
	);
};

export default Cart;

function CheckoutForm() {
	const [ isPaymentLoading, setPaymentLoading ] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	const payMoney = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		setPaymentLoading(true);
		const card = elements.getElement(CardElement);
		const result = await stripe.createToken(card);
		if (result.error) {
			alert(result.error.message);
		} else {
			alert('Success');
		}
	};

	return (
		<div>
			<div>
				<form
					style={{
						display: 'block',
						width: '100%'
					}}
					onSubmit={payMoney}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}}
					>
						<h4 id="checkout">Checkout</h4>

						<CardElement
							className="card"
							options={{
								style: {
									base: {
										backgroundColor: 'white'
									}
								}
							}}
						/>
						<button className="pay-button" disabled={isPaymentLoading}>
							{isPaymentLoading ? 'Loading...' : 'Pay'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
