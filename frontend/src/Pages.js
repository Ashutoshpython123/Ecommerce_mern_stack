import React,{useContext} from 'react'
import {Switch, Route} from 'react-router-dom'

import Products from './Products'
import Carts from './Carts'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import DetailProduct from './DetailProduct'
import Categories from './Categories'
import { GlobalState } from './GlobalState'
import CreateProduct from './CreateProduct'



function Pages() {
    const state = useContext(GlobalState)
    const [isAdmin] = state.UserAPI.isAdmin
    const [isLogged] = state.UserAPI.isLogged

    return (
        <Switch>
            <Route path="/detail/:id" exact component={DetailProduct}/>
            <Route path="/" exact component={Products} />
            <Route path="/Cart" exact component={Carts} />
            <Route path="/Register" exact component={Register} />
            <Route path="/Login" exact component={Login}/>
            <Route path="/categories" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound}/>
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound}/>
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
