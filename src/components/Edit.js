import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const Edit = ({showModalEdit, setShowModalEdit, setRefresh, payload}) => {

    const [data, setData] = useState({})
    const {nama, deskripsi} = data;

    useEffect(() =>{
        if(Object.keys(payload).length !== 0){
            setData(payload)
        }
    }, [payload])

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if( !data.nama ){
            
            alert("Data belum terisi")
            return
        }

        fetch("http://localhost:8000/data/" + data.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setRefresh(true)
			alert("Data Edited")
            setShowModalEdit(false)
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
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form >
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Nama "
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

export default Edit