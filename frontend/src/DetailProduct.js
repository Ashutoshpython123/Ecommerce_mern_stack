import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GlobalState } from './GlobalState'
import ProductItem from './ProductItem'
import Button from '@material-ui/core/Button';

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
            <h2 className="detail__title">{detailProduct.title}</h2>
            <div className="detail__product">
                <div>
                    <img className="detail__image" src={detailProduct.images.url} />
                </div>
                <div>
                    <p>{detailProduct.product_id}</p>
                    <p>{detailProduct.price}</p>
                    <p>{detailProduct.desciption}</p>
                    <p>{detailProduct.content}</p>
                    <p>{detailProduct.solid}</p>
                    <Link to="/cart"><Button variant="contained" color="primary">Buy Now</Button></Link>
                </div>
            </div>

            <div>
                <h2 className="pro_title">Related Product</h2>
                <div className="pro">
                    <div className="Product">
                        {
                            products.map(product => {
                                return product.category === detailProduct.category
                                    ? <ProductItem key={product._id} product={product} /> : null
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
