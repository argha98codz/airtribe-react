import { Group, Space, Pagination, Select, LoadingOverlay } from "@mantine/core";
import useFetchProductListing from "../services/product/useFetchProductListing";
import ProductsGrid from "../components/ProductsGrid";

const Home = () => {
    const {products, activePage, limit, setActivePage, setLimit, loading, errorState} = useFetchProductListing();

    if (loading) {
        return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
    }
    if (errorState) {
        return <h1>Error occurred : We could not fetch products...</h1>
    }
    return (
        <>
            <ProductsGrid products={products} />
            <Space h="xl" />
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