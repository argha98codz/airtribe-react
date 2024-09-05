import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { Card, Group, Badge, Container, Button, Image, Text, Space, Grid } from '@mantine/core';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <Container>
        <h2>Your Wishlist is Empty</h2>
        <p>Browse products and add them to your wishlist to see them here.</p>
      </Container>
    );
  }

  return (
    <>
      <Text
            size="xl"
            style={{ margin: '20px', color: '#333', fontWeight: 'bold' }}
        >
        Your Wishlist
      </Text>
      <Container size="xl">
        <Grid>
            {wishlistItems.map((product) => (
            <Grid.Col key={product.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Card onClick={() => {
                navigate(`/products/${product.id}`, {
                    preventScrollReset: false
                })
            }} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                    src={product.image}
                    alt={product.model}
                    />
                </Card.Section>
                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={700}>{product.title}</Text>
                    <Badge color="pink">{product.category}</Badge>
                </Group>

                <Text fz={30} fw={500}>${product.price}</Text>
                <Space h="md" />
                <Button 
                    color="purple"
                    radius="lg"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleWishlist(product))
                    }}>
                        Remove from Cart
                </Button>
            </Card>
        </Grid.Col>
            ))}
            </Grid>
      </Container>
    </>
  );
};

export default WishlistPage;