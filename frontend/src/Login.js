import { useState } from 'react'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Login.css'



function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post('/user/login', { ...user })
            localStorage.setItem('firstLogin', true)
            window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="Login">
            <h2 className="login_title">Login</h2>
            <form onSubmit={loginSubmit}>
                <div className="login__form">
                    <input className="field" type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                    <input className="field" type="password" name="password" required placeholder="Password" value={user.password} onChange={onChangeInput} />
                    <div className="login_button">
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Login
                        </Button>
                        <Link to="/Register"> <Button type="submit" fullWidth variant="contained" color="primary">
                           Register
                        </Button></Link>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login