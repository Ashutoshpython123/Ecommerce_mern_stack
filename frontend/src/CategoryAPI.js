import {useEffect, useState} from 'react'
import axios from 'axios'

function CategoryAPI() {
    const [category, setCategory] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/product/category')
            setCategory(res.data)
        }
        getCategory()

    }, [callback])

    return {
        category : [category, setCategory],
        callback : [callback, setCallback]
    }

}

export default CategoryAPI
