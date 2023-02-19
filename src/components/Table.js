
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Table = ({isRefresh, setRefresh, setShowModal, setShowModalEdit, setPayload}) => {
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if (isRefresh) {
        fetch('http://localhost:8000/data')
            .then((res) => res.json())
            .then((res) => {
                setRefresh(false)
                setProducts(res)
            })
    }}, [isRefresh, setRefresh]);

    const editData = (id) =>{
        fetch(`http://localhost:8000/data?id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setPayload(res[0])
                setShowModalEdit(true)
            })
    }

    const deleteData = (id) => {
        fetch("http://localhost:8000/data/" + id, {
          method: "DELETE",
        }).then(() => {
          alert("Data Deleted")
          setRefresh(true);
        });
      };

      const logout = () => {
        navigate('/login')
        localStorage.removeItem("loggedUser")
      }

    return (
        <div className=" container p-5">
            <h1 className='mb-3'>Tabel Data Admin </h1>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add Data</button>
            <button className='btn btn-danger float-end' onClick={() => logout()}>Logout</button>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" >ID</th>
                        <th scope="col" >Nama</th>
                        <th scope="col" >Deskripsi</th>
                        <th scope="col" >Action</th>

                    </tr>
                </thead>
                <tbody>
                    {products.map((item, i) => {
                        return <tr>
                            <td>{i + 1}</td>
                            <td>{item.nama}</td>
                            <td>{item.deskripsi}</td>
                            <td>
                                <button className='btn btn-success' onClick={() => editData(item.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => deleteData(item.id)}>Delete</button>
                            </td>
                            
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Table