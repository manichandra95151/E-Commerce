import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items added to the cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">Price: ₹{item.price}</p>
                <div className="input-group mb-3" style={{ maxWidth: "200px" }}>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  />
                  <button className="btn btn-outline-dark" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="mt-4">Total: ₹{total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
