import React from 'react'
import { Link } from 'react-router-dom'
import './ProductItem.css'

function ProductItem({ product, isAdmin, handleCheck, addToCart }) {

    return (
        <div className="product">
            <div>
                {
                    isAdmin && <input type="checkbox" checked={product.checked}
                        onChange={() => handleCheck(product._id)} />
                }
                <h2>{product.title}</h2><span>{product.price}</span>
                <p>{product.content}</p>
            </div>
            <img src={product.images.url} height="300px" width="200px" alt="" />
            <div>
                {
                    isAdmin ?
                        <>
                            <Link to="#">Delete</Link>
                            <Link to="#">Edit</Link>
                        </>
                        :
                        <>
                            <Link to="#" onClick={() => addToCart(product)}>Buy</Link>
                            <Link to={`/detail/${product._id}`}>View</Link>
                        </>
                }
            </div>
        </div>
    )
}

export default ProductItem
