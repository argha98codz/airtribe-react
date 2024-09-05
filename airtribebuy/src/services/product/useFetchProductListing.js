import { useEffect, useState } from "react";
export default function useFetchProductListing(optionalQuery = "") {
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [errorState, setErrorState] = useState(null);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        async function fetchData() {
            try {
                setLoading(true);
                const data = await fetch(`https://fakestoreapi.in/api/products?page=${activePage}&limit=${limit}`);
                const dataJson = await data.json();
                setProducts(dataJson.products);
                setLoading(false);
            } catch (error) {
               setLoading(false);
               setErrorState(error);
            }
        }
        fetchData();
    }, [activePage, limit, optionalQuery])
    return {products, activePage, limit, setActivePage, setLimit, loading, errorState};
}