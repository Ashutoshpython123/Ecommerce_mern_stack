import React, { useContext } from 'react'
import { GlobalState } from './GlobalState'
import ProductItem from './ProductItem'
import './ProductItem.css'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.ProductAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const addToCart = state.UserAPI.addToCart

    const handleCheck = (id) => {
        products.forEach(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
        })
        setProducts([...products])
    }

    return (
        <div className="pro">
            <div className="Product">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} isAdmin={isAdmin} handleCheck={handleCheck} addToCart={addToCart} />
                    })
                }
            </div>
        </div>
    )
}

export default Products
