import user from '../data/user.json'
import { useNavigate, useParams } from "react-router-dom";
import { useState  } from 'react';

function Reset({setUser}) {

    const {id} = useParams()

    const rawData = user.data.filter(item => item.id === id )

    const navigate = useNavigate();


    const [data, setData] = useState(rawData[0])
    const {password} = data;

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,./?])(?=.*[a-zA-Z]).{8,}$/;
        
        if( !data.password ){
            
            alert("Data inputan belum terisi")
            return
        }else if (!passwordRegex.test(data.password)){
            alert("Gunakan kombinasi huruf besar, huruf kecil, angka, dan simbol, serta minimal 8 karakter")
            return
        }

        fetch('http://localhost:4000/data/' + data.id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
			alert("Berhasil reset password")
            setUser(data)
            localStorage.setItem("loggedUser", data.email)
            navigate('/')
        });
        
    }

    return (
        <>
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
               
                <div className="card p-5 w-50">
                <h1 className='mb-2'>Reset Password</h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group my-3">
                            <label htmlFor="exampleInputPassword1"><i class="bi bi-person-fill"/>{rawData[0].email}</label>
                            <input type="password" 
                            value={password}
                            onChange={(e) => onValueChange(e)}
                            className="form-control" id="password" name="password" placeholder="pilih password baru" />
                        </div>
                        <button type="submit" className="btn btn-success w-100" >Reset</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Reset;