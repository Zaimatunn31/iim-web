import { useState, useRef, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';

const Forgot = ({showModalForgot, setShowModalForgot}) => {

    const [link, setLink] = useState('')
    const [user_email, setUserEmail] = useState('')

    useEffect(() => {
        fetch(`http://localhost:4000/data?email=${user_email}`)
            .then((res) => res.json())
            .then((res) => {
                if(res.length){
                    setLink(`http://localhost:3000/reset/${res[0].id}`)
                    
                }
            })
    },[user_email])

    const form = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        if(!link){
            return
        }

        emailjs.sendForm('service_rpmcljh', 'template_cul231f', form.current, 'FIAoOzgaVBzAXEBcq')
        .then((result) => {
            alert('Email reset terkirim');
            setShowModalForgot(false)
        }, (error) => {
            alert('Terdapat kesalahan');
        });
        
    }

    return (
        <>
            <Modal show={showModalForgot} onHide={() => setShowModalForgot(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form ref={form}>
                    <div className="form-group mt-3">
                        <input type="hidden" name="from_name" value="Kevin"/>
                        <input type="hidden" name="link" value={link}/>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Email"
                            name="user_email" 
                            onChange={(e) => setUserEmail(e.target.value)}
                            />
                    </div>
                    <button type="button" className="btn btn-primary mt-3" onClick={onSubmit}>Ubah password</button>
                </form>
                </Modal.Body>
            </Modal>
        </>       
    )
}

export default Forgot