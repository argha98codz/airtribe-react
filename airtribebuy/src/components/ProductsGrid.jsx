import { Grid, Card, Button, Text, Space, Group, Badge, Image } from "@mantine/core";
const ProductsGrid = ({products}) => {

    return ( 
        <Grid>
                {products?.map(product => 
                    <Grid.Col mah={800} key={product.id} span={{ base: 12, md: 6, lg: 3 }}>
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

                            {/* <Text size="sm" c="dimmed">
                                {product.description}
                            </Text> */}

                            {/* <Button 
                                onClick={(e) => handleAddToWishList(e, product)} 
                            color="orange"
                             fullWidth mt="md"
                              radius="md"
                              disabled={wishlistState.find(item => item.id === product.id)}
                            >
                            {wishlistState.find(item => item.id === product.id) ? 'Wishlisted' : 'Add to wishlist'}
                            </Button> */}
                            {!cart.length ? 
                            <Button 
                                onClick={handleAddToCart} color="purple" fullWidth mt="md" radius="md">
                            Add To Cart
                            </Button> : 
                            <Group justify="stretch" align="center" gap={5}>
                                <Button>-</Button>
                                <NumberInput />
                                <Button>+</Button>
                            </Group>}
                            
                        </Card>
                    </Grid.Col>
            )}  
            </Grid>
     );
}
 
export default ProductsGrid;