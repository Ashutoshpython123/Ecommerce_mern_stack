import React, { useState, useContext } from 'react'
import { GlobalState } from './GlobalState'
import './Categories.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.CategoryAPI.category
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.CategoryAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')


    const createCategory = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                const res = await axios.put(`/product/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post('/product/category', { name: category }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) => {
        setId(id)
        setCategory(name)
        setOnEdit(true)

    }

    const deleteCategory = async id => {
        try{
            const res = await axios.delete(`/product/category/${id}`, {
                headers : {Authorization : token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        }catch(err){
            alert(err.response.data.msg)
        }
    }

    return (
        <div>
            <h2 className="categories__title">Create Categories</h2>
            <form onSubmit={createCategory} className="categories__form">
                <input type="text" name="category" required value={category} onChange={e => setCategory(e.target.value)} />
                <Button type="submit">{onEdit ? "UPDATE" : "CREATE"}</Button>
            </form>

            <div>
                {
                    categories.map(category => (
                        <div className="categories__all" key={category._id}>
                            <p style={{ fontSize: 20 }}>{category.name}</p>
                            <button onClick={() => editCategory(category._id, category.name)}>EDIT</button>
                            <button onClick={() => deleteCategory(category._id)}>DELETE</button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Categories
