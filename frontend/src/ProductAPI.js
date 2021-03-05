import React, {useState, useEffect} from 'react'
import axios from 'axios'

function ProductAPI() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get('/productapi/products')
        setProducts(res.data.products)
    }

    useEffect(() => {
        getProducts()
    },[])
    return {
        products : [products, setProducts]
    }
}

export default ProductAPI
