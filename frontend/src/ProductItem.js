import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'

function ProductItem({ product, isAdmin, handleCheck, addToCart }) {

    return (
        <div className="product__card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }
            <h2>{product.title}</h2>
            <span>{product.price}</span>
            <p>{product.content}</p>
            <img src={product.images.url} height="300px" width="200px" alt="" />
            <div className="bttt">
                {
                    isAdmin ?
                        <>
                            <Link className="bttt__l" to="#">Delete</Link>
                            <Link className="bttt__l" to={`/edit_product/${product._id}`}>Edit</Link>
                        </>
                        :
                        <>
                            <Link className="bttt__l" to="#" onClick={() => addToCart(product)}>Buy</Link>
                            <Link className="bttt__l" to={`/detail/${product._id}`}>View</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default ProductItem
