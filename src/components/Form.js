import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const Form = ({showModal, setShowModal, setRefresh}) => {

    const initialValue = {
        nama: "",
        deskripsi : "",
    }

    const [data, setData] = useState(initialValue)
    const {nama, deskripsi} = data;

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if( !data.nama ){
            
            alert("Data inputan belum terisi")
            return
        }

        fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setRefresh(true)
			alert("Data Added")
            setShowModal(false)
        });
        
    }

    const onReset = () => {
        setData({
            nama: "",
            deskripsi : "",
        })
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form >
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Nama"
                            onChange={(e) => onValueChange(e)}
                            name="nama" 
                            value={nama} />
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Deskripsi"
                            onChange={(e) => onValueChange(e)}
                            name="deskripsi" 
                            value={deskripsi} />
                    </div>
                  
                    <button type="button" className="btn btn-warning mt-3 " onClick={onReset}>Reset</button>
                    <button type="button" className="btn btn-primary mt-3 mx-3" onClick={onSubmit}>Submit</button>
                </form>
                </Modal.Body>
            </Modal>
        </>       
    )
}

export default Form