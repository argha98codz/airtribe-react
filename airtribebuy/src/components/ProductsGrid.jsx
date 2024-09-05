import { Grid, Card, Button, Text, Space, Group, Badge, Image, Container, ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const ProductsGrid = ({products}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist?.items || []);
    const cartItems = useSelector((state) => state.cart?.items || []);

    return (
        <Container size="xl">
            <Grid>
                {products?.map(product => {
                    const isWishlisted = wishlistItems.some((item) => item.id === product.id);
                    const isInCart = cartItems.some((item) => item.id === product.id);
                    return (
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
                                <Group mt="xs">
                                    <Button 
                                        color={ isInCart ? "red" : "purple"}
                                        radius="md" 
                                        style={{ flex: 1 }} 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            isInCart ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product))}}
                                        >
                                            {isInCart ? "Remove from Cart" : "Add to Cart"}
                                    </Button>
                                    <ActionIcon variant="default" radius="md" size={36} onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(toggleWishlist(product));
                                    }}>
                                        {!isWishlisted ?
                                        <IconHeart color="red" stroke={1.5} /> :
                                        <IconHeartFilled color="red" stroke={1.5} />}
                                    </ActionIcon>
                                </Group>
                            </Card>
                        </Grid.Col>
                    )}
            )}  
            </Grid>
        </Container>
     );
}

export default ProductsGrid;