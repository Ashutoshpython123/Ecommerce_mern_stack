import React, { useContext, useState } from 'react'
import { GlobalState } from './GlobalState'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import './ProductItem.css'

function Carts() {
    const state = useContext(GlobalState)
    const [cart] = state.UserAPI.cart
    const [total, setTotal] = useState(0)

    if (cart.length === 0) {
        return <h2 style={{ textAlign: "center" }}>cart is empty</h2>
    }
    return (
        <div>
            {
                cart.map(product => (
                    <div style={{ marginBottom: 20 }}>
                        <h2 className="detail__title">{product.title}</h2>
                        <div className="detail__product">
                            <div>
                                <img className="detail__image" src={product.images.url} />
                            </div>
                            <div>
                                <p>Id : {product.product_id}</p>
                                <p>Price : {product.price * product.quantity}$</p>
                                <p>Description : {product.desciption}</p>
                                <p>Content : {product.content}</p>
                                <div>
                                    <span>Quantity : </span>
                                    <button>-</button>
                                    <span style={{ marginLeft: 5, marginRight: 5, marginBottom: 5 }}>{product.quantity}</span>
                                    <button>+</button>
                                </div>


                                <Link to="/cart"><Button variant="contained" color="primary">Buy Now</Button></Link>
                            </div>
                            <div className="delete">
                                X
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className="total">
                <h3>Total: $ 0</h3>
                <h2>payment</h2>
            </div>
        </div>
    )
}

export default Carts
