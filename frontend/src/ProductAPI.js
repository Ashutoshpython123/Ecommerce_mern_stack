import {useState} from 'react'

function ProductAPI() {
    const [products, setProducts] = useState([])

    
    return {
        products : [products, setProducts]
    }
}

export default ProductAPI
