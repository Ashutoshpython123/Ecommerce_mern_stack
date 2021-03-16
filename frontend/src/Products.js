import React, { useContext, useEffect } from 'react'
import { GlobalState } from './GlobalState'
import ProductItem from './ProductItem'
import './ProductItem.css'
import axios from 'axios'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const addToCart = state.UserAPI.addToCart



    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/productapi/products')
            setProducts(res.data.products)
        }
        getProducts()
    }, [])

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
        })
        setProducts([...products])
    }

    return (
        <div>
            <h2 className="pro_title">Products</h2>
            <div className="pro">
                <div className="Product">
                    {
                        products.map(product => {
                            return <ProductItem key={product._id} product={product} isAdmin={isAdmin} handleCheck={handleCheck} addToCart={addToCart} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products
