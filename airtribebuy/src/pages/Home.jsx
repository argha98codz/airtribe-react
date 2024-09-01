/*
    fetch("https://fakestoreapi.in/api/products")
.then(res => res.json())
.then(res => console.log(res))


*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Image, Text, Badge, Button, Group, Space, Pagination, Select, LoadingOverlay, NumberInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useFetchProductListing from "../services/product/useFetchProductListing";
import isUserAuth from "../utils/helper";
const Home = () => {
    const [wishlistState, setWishlist] = useState(() => JSON.parse(localStorage.getItem("airtribe-user-wishlist")));
    const [cart, addToCart] = useState([]);
    const navigate = useNavigate();
    const {products, activePage, limit, setActivePage, setLimit, loading, errorState} = useFetchProductListing('category?type=mobile');
    const [isProductAddedToCart, setIsProductAddedToCart] = useState({});

    useEffect(() => {
        if (products.length) {
            const productMap = products.reduce((acc, product,index) => {
                acc[product.id] = false;
                return acc;
            },{})
            setIsProductAddedToCart(productMap);
        }
    },[products])
    console.log(isProductAddedToCart);
    const handleAddToWishList = (e, product) => {
        e.stopPropagation();
        // Check if user is authenticated or not
        // const isAuth = localStorage.getItem('airtribe-user-auth');
        // if (!isAuth || isAuth !== 'authenticated' ) {
        //     notifications.show({
        //         title: 'Unauthrorized',
        //         message: 'Please login',
        //         color: "red"
        //     })
        //     return;
        // }
        if(!isUserAuth()) {
            notifications.show({
                title: 'Unauthrorized',
                message: 'Please login',
                color: "red"
            })
            return null
        }
        const wishlist = JSON.parse(localStorage.getItem('airtribe-user-wishlist'));
        if (!wishlist) {
            let newWishlist = [];
            newWishlist.push(product);
            localStorage.setItem('airtribe-user-wishlist', JSON.stringify(newWishlist));
            notifications.show({
                title: 'Added to wishlist!',
                color: "green",
                position: "top-center"
            })
            return true;
        }
        if (wishlist.length) {
            const modifiedWishlist = [...wishlist];
            modifiedWishlist.push(product);
            localStorage.setItem('airtribe-user-wishlist', JSON.stringify(modifiedWishlist));
            notifications.show({
                title: 'Added to wishlist!',
                color: "green",
                position: "top-center"
            })
            return true;
        }
    }
    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            notifications.show({
                title: 'Unauthrorized',
                message: 'Please login',
                color: "red"
            })
            return null
        }
        addToCart(prev => [...prev, {product: product.id, quantity: 1}]);
        setIsProductAddedToCart(prev => ({
            ...prev,
            [product.id]: true
        }))
    }

    const handleReduceQuantity = (e, id) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            notifications.show({
                title: 'Unauthrorized',
                message: 'Please login',
                color: "red"
            })
            return null
        }
        const addedProduct = cart.find(item => item.product === id);
        if (addedProduct.quantity === 1) {
            const modifiedCart = cart.filter(item => item.product !== id);
            addToCart(modifiedCart);
            setIsProductAddedToCart(prev => ({
                ...prev,
                [id]: false
            }))
        }
        if (addedProduct.quantity > 1) {
            const modifiedCart = cart.map(item => {
                if (item.product === id) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item;
            })
            addToCart(modifiedCart);
        }
    }

    const handleIncreaseQuantity = (e, id) => {
        e.stopPropagation();
        if (!isUserAuth()) {
            notifications.show({
                title: 'Unauthrorized',
                message: 'Please login',
                color: "red"
            })
            return null
        }
        const addedProduct = cart.find(item => item.product === id);
        if (addedProduct.quantity < 10) {
            const modifiedCart = cart.map(item => {
                if (item.product === id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item;
            })
            addToCart(modifiedCart);
        }
    }

    const handleQuantityChange = (e,id) => {/* Implement this */}
    if (loading) {
        return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    }
    if (errorState) {
        return <h1>Error occurred : We could not fetch products...</h1>
    }
    return (
        <>
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
                            {console.log(cart)}
                            {isProductAddedToCart[product.id] ? 
                            <Group justify="stretch" align="center" gap={5}>
                                <Button onClick={(e) => handleReduceQuantity(e, product.id)}>-</Button>
                                <NumberInput value={cart.find(item => item.product === product.id)?.quantity} onChange={(e) => handleQuantityChange(e, product.id)} />
                                <Button onClick={(e) => handleIncreaseQuantity(e, product.id)}>+</Button>
                            </Group> : 
                            <Button 
                                onClick={(e) => handleAddToCart(e,product)} color="purple" fullWidth mt="md" radius="md">
                            Add To Cart
                            </Button>
                            }
                            
                        </Card>
                    </Grid.Col>
            )}  
            </Grid>
            <Space h="xl" />
            <Group align="center" gap={5}>
                                <Button>+</Button>
                                <NumberInput/>
                                <Button>-</Button>
                            </Group>
            <Group gap={5} justify="center">
                <Pagination value={activePage} onChange={setActivePage} total={Math.ceil(500 / limit)} />
                <Select
                    value={limit}
                    onChange={setLimit}
                    placeholder="Set Limit"
                    data={['10', '20', '30', '40', '50']}
                 />
            </Group>
            <Space h="xl" />   
        </>
     );
}
 
export default Home;


/*
    Implement add to cart functionality -:
    1. On the initial click of add to cart button, the button should be hidden and a 
    group of + and - and input field should be displayed.
    2. The input field must be populated by 1 (default value)
    3. The + and - buttons must be connected to the input field such that when the + button is clicked, the input field value increases by 1 and when the - button is clicked, the input field value decreases by 1.
    4. On the above change, change the totalPrice and the quantity key of the product in the cart
    5. (Optional) - Implment a feature in which a user can directly input the qunatity in the field and that should be updated in the cart product (debouncing here...)    
*/