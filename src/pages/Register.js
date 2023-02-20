import user from '../data/user.json'
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

function Register({setUser}) {

    const navigate = useNavigate();

    const initialValue = {
        email: "",
        password : "",
    }

    const [data, setData] = useState(initialValue)
    const {email, password} = data;

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,./?])(?=.*[a-zA-Z]).{8,}$/;
        
        if( !data.email ){
            
            alert("Data inputan belum terisi")
            return
        }else if (!passwordRegex.test(data.password)){
            alert("Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol, serta minimal 8 karakter")
            return
        }

        fetch('http://localhost:4000/data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
			alert("User baru telah ditambahkan")
            setUser(data)
            localStorage.setItem("loggedUser", data.email)
            navigate('/')
        });
        
    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
               
                <div className="card p-5 w-50">
                <h1 className='mb-4'>Sing up</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" 
                            value={email}
                            onChange={(e) => onValueChange(e)}
                            className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="ketikkan username anda" />
                        </div>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" 
                            value={password}
                            onChange={(e) => onValueChange(e)}
                            className="form-control" id="password" name="password" placeholder="ketikkan password anda" />
                        </div>
                        <button type="submit" className="btn btn-success w-100" >Sing up</button>
                        <Link to="/login"  className="btn btn-primary w-100 my-2">Have acount? Sign in</Link>
                        

                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
