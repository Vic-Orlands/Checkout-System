import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.css';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';

const Header = () => {
	const [ cartItems, setCartItems ] = useState([]);

	useEffect(() => {
		let currentCart = JSON.parse(localStorage.getItem('cart'));
		if (currentCart !== undefined) {
			setCartItems(currentCart);
		} else {
			return null;
		}
	}, []);

	return (
		<nav>
			<h1>React Checkout</h1>

			<ul>
				<NavLink to="/" id="li">
					<li>home</li>
				</NavLink>

				<div className="dropdown">
					<li>
						Categories<IoMdArrowDropdown />
					</li>
					<ul className="dropdown-content">
						<li>Men</li>
						<li>Women</li>
						<li>Electronics</li>
						<li>Jewelries</li>
					</ul>
				</div>

				<NavLink to="/cart" id="li">
					<li>
						<AiOutlineShoppingCart id="font" />
						cart<span>  ({cartItems ? cartItems.length : '0'})</span>
					</li>
				</NavLink>
			</ul>
		</nav>
	);
};

export default Header;
