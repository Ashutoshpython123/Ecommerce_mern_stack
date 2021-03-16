import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from './GlobalState'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'How to and tutorial videos of cool CSS effect, Web Design ideas,JavaScript libraries, Node.',
    content: 'Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css.',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.CategoryAPI.category
    const [images, setImages] = useState(false)
    const [isAdmin] = state.UserAPI.isAdmin
    const [token] = state.token
    const [onEdit, setOnEdit] = useState(false)

    const history = useHistory()
    const param = useParams()
    const [products, setProducts] = state.ProductAPI.products

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id, products])

    const handleUpload = async e => {
        try {
            if (!isAdmin) {
                return alert("you are not admin")
            } else {
                const file = e.target.files[0]
                if (!file)
                    return alert('file does not exist')

                if (file.size > 1024 * 1024)
                    return alert('size is to large')

                if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                    return alert('file format is incorrect')

                let formData = new FormData()
                formData.append('file', file)

                const res = await axios.post('/file/upload', formData, {
                    headers: { 'content-type': 'multipart/form-data', Authorization: token }
                })
                setImages(res.data)
            }
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin)
                return alert('you are not an Admin')

            await axios.post('/file/delete', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handelChangeInput = e => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (!isAdmin)
                return alert('you are not admin')
            if (!images)
                return alert('image is not upload')

            if(onEdit){
                await axios.put(`/productapi/products/${product._id}`, {...product, images}, {
                    headers : {Authorization : token}
                })
            }else{
                await axios.post('/productapi/products', {...product, images}, {
                    headers : {Authorization : token}
                })
            }
            setImages(false)
            setProduct(initialState)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="create_product">
            <h2>create product</h2>
            <div>
                <input type="file" name="file" onChange={handleUpload} />
                <div>
                    <img src={images ? images.url : ''} />
                    <button onClick={handleDestroy}>X</button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="product_id" id="product_id" placeholder="id" required value={product.product_id} onChange={handelChangeInput} disabled={onEdit} />
                </div>
                <div>
                    <input type="text" name="title" id="title" placeholder="title" required value={product.title} onChange={handelChangeInput} />
                </div>
                <div>
                    <input type="number" name="price" id="price" placeholder="price" required value={product.price} onChange={handelChangeInput} />
                </div>
                <div>
                    <textarea type="text" name="description" id="description" placeholder="description" rows="5" required value={product.description} onChange={handelChangeInput} />
                </div>
                <div>
                    <textarea type="text" name="content" id="content" placeholder="content" rows="6" required value={product.content} onChange={handelChangeInput} />
                </div>
                <div>
                    <select name="category" value={product.category} onChange={handelChangeInput} >
                        <option value="">select a produc category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id} >
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit">{onEdit ? "UPDATE" : "CREATE"}</button>
            </form>
        </div>
    )
}

export default CreateProduct
