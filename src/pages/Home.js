import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Form from "../components/Form";
import Edit from "../components/Edit";

function Home ({user}){


    const [isRefresh, setIsRefresh] = useState(true)
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [payload, setPayload] = useState({})

    useEffect(() =>{
        if(Object.keys(user).length === 0 && !localStorage.getItem('loggedUser')){
            navigate("/login");
        }

    }, [user])

    const setRefresh = (status) => {
        setIsRefresh(status)
    }


    return(
        <> 
        <Form setRefresh={setRefresh} showModal={showModal} setShowModal={setShowModal} />
        <Edit setRefresh={setRefresh} showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} payload={payload}/>
        <Table setRefresh={setRefresh} isRefresh={isRefresh} setShowModal={setShowModal} setShowModalEdit={setShowModalEdit} setPayload={setPayload}/>
        </>
    )
}

export default Home;