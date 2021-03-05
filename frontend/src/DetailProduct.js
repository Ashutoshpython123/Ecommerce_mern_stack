import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from './GlobalState'
import ProductItem from './ProductItem'

function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.ProductAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product)
                }
            })
        }
    }, [params, products])

    if (detailProduct.length === 0) {
        return null
    }


    return (
        <div>
            <div>
            <img src={detailProduct.images.url} />
            <h2>{detailProduct.title}</h2>
            <h2>{detailProduct.product_id}</h2>
            <h2>{detailProduct.price}</h2>
            <h2>{detailProduct.desciption}</h2>
            <h2>{detailProduct.content}</h2>
            <h2>{detailProduct.solid}</h2>
            <Link to="/cart">Buy Now</Link>
            
            </div>
            <div>
                <h2>Related Product</h2>
                {
                    products.map(product => {
                        return product.category === detailProduct.category
                        ? <ProductItem key={product._id} product={product} /> : null
                    })
                }
            </div>
        </div>
    )
}

export default DetailProduct
