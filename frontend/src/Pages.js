import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Products from './Products'
import Carts from './Carts'
import Login from './Login'
import Register from './Register'
import NotFound from './NotFound'
import DetailProduct from './DetailProduct'


function Pages() {
    return (
        <Switch>
            <Route path="/detail/:id" exact component={DetailProduct}/>
            <Route path="/" exact component={Products} />
            <Route path="/Cart" exact component={Carts} />
            <Route path="/Register" exact component={Register} />
            <Route path="/Login" exact component={Login}/>
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
