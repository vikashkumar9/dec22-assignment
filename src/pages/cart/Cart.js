import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from '../backButton/BackButton';

const productList = [
  { id: 1, name: 'Pizza', price: 100, quantity: 1 },
  { id: 2, name: 'Burger', price: 50, quantity: 1 },
  { id: 3, name: 'Maggi', price: 30, quantity: 1 },
  { id: 4, name: 'Sandwich', price: 40, quantity: 1 },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const Cart = () => {
  const [cart, setCart] = useState(productList);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart'));
      if (Array.isArray(savedCart)) {
        setCart(savedCart);
      }
    } catch {
      console.error('Failed to load cart from localStorage.');
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, 300);
    return () => clearTimeout(timeout);
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const discounted = total - total * (discount / 100);
    setTotalPrice(total);
    setDiscountedPrice(discounted);
  }, [cart, discount]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent invalid quantity
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDiscountChange = (e) => {
    const discountValue = e.target.value;
    if (discountValue === '') {
      setDiscount('');
    } else {
      const parsedDiscount = parseInt(discountValue, 10);
      if (parsedDiscount >= 0 && parsedDiscount <= 100) {
        setDiscount(parsedDiscount);
      } else if (parsedDiscount < 0) {
        setDiscount(0);
      }
    }
  };

  const handleRemoveProduct = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className='container mx-auto p-4 max-w-screen-lg'>
      <BackButton />
      <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800'>
        Shopping Cart
      </h1>

      <div className='bg-gray-100 p-4 rounded-lg shadow-lg'>
        {cart.length > 0 ? (
          <ul className='space-y-4'>
            {cart.map((item) => (
              <li
                key={item.id}
                className='flex flex-col sm:flex-row justify-between items-center p-4 bg-white rounded-lg shadow-sm border gap-4'
              >
                <div className='flex flex-col sm:flex-row items-center gap-4'>
                  <span className='text-lg font-semibold text-gray-700'>
                    {item.name}
                  </span>
                  <span className='text-gray-500'>
                    {formatCurrency(item.price)}
                  </span>
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-4'>
                  <input
                    type='number'
                    min='1'
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                    className='w-20 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                  />
                  <span className='text-gray-600'>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => handleRemoveProduct(item.id)}
                    className='text-red-500 hover:text-red-700 font-medium'
                  >
                    <MdOutlineDelete className='text-3xl' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-600'>Your cart is empty.</p>
        )}

        <div className='mt-6 bg-white p-4 rounded-lg shadow-sm border space-y-4'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <label className='text-lg font-semibold text-gray-700'>
              Discount (%)
            </label>
            <input
              type='number'
              value={discount}
              onChange={handleDiscountChange}
              min='0'
              max='100'
              className='w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className='flex flex-col sm:flex-row justify-between items-center text-lg font-semibold text-gray-800 gap-4'>
            <span>Total (before discount):</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-center text-lg font-semibold text-gray-800 gap-4'>
            <span>Total (after discount):</span>
            <span>{formatCurrency(discountedPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
