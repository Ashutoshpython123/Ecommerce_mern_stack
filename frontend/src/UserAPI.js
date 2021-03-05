import { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: { Authorization: token }
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    const addToCart = async (product) => {
        if(!isLogged) {
            return alert("please login to continue buying")
        }

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check) {
            setCart([...cart, {...product, quantity : 1}])

            await axios.patch('/user/addCart', {cart : [...cart, {...product, quantity : 1 }]})

        }else {
            alert("this product is added to cart")
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart : [cart, setCart],
        addToCart : addToCart
    }
}

export default UserAPI
