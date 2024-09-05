import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, setShippingAddress } from '../store/slices/cartSlice';
import { Button, Input, NumberInput, Container, Image, Table, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import razorpayPayment from '../utils/razorpayPayment';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress);

  const handleQuantityChange = (productId, value) => {
    dispatch(updateQuantity({ productId, quantity: value }));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, product) => total + product.price * product.quantity, 0);
  // Calculate 18% tax
  const tax = totalPrice * 0.18;
  // Calculate final total
  const finalTotal = totalPrice + tax;

  const handlePayment = () => {
    razorpayPayment({ amount: totalPrice * 100, address });
  };

  return (
    <Container>
        <Text
            size="xl"
            style={{ margin: '20px', color: '#333', fontWeight: 'bold' }}
        >
            Your Cart
        </Text>

      {cartItems.length === 0 ? (
        <p style={{ color: '#999' }}>Your cart is empty. Add items to your cart to see them here.</p>
      ) : (
        <>
          <Table
            striped
            highlightOnHover
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              marginBottom: '30px',
            }}
          >
            <thead style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
              <tr>
                <th style={{ padding: '15px', textAlign: 'left' }}>Product</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Price</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Quantity</th>
                <th style={{ padding: '15px', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product.id} style={{ verticalAlign: 'middle', backgroundColor: '#fff' }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        radius="md"
                        style={{ marginRight: '15px', border: '1px solid #ddd' }}
                      />
                      <div>
                        <strong style={{ color: '#333' }}>{product.title}</strong>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px', color: '#333' }}>${product.price}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <NumberInput 
                      value={product.quantity}
                      onChange={(value) => handleQuantityChange(product.id, value)}
                      min={1}
                      max={10}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right', color: '#333' }}>
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <IconTrash color="red" onClick={() => dispatch(removeFromCart(product.id))} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Text size="lg" style={{ textAlign: 'right', marginBottom: '10px', color: '#333', fontWeight: 'bold' }} >
              Total: ${totalPrice.toFixed(2)}
            </Text>
            <Text size="lg" style={{ textAlign: 'right', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>
              Tax (18%): ${tax.toFixed(2)}
            </Text>
            <Text size="lg" style={{ textAlign: 'right', marginBottom: '20px', color: '#333', fontWeight: 'bold' }}>
              Final Total: ${finalTotal.toFixed(2)}
            </Text>
          </div>

          <h3 style={{ marginBottom: '10px', color: '#333' }}>Shipping Address</h3>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your shipping address"
            onBlur={dispatch(setShippingAddress(address))}
            style={{ marginBottom: '20px', padding: '10px', borderColor: '#ddd' }}
          />

          <Button
            onClick={handlePayment}
            style={{
              backgroundColor: '#12719c',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '30px',
              fontSize: '16px',
              marginBottom: '20px',
            }}
          >
            Proceed to Payment
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;