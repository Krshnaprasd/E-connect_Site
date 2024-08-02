import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';


const EmployeeDetails = () =>{

    const [Employees, setEmployee] = useState([]);

    const [User, setUserData] = useState({
    
        userid: '',
        name: '',
        email: '',
        designation: '',
        phoneno: '',
        password: '',
    
    });
    
    const handleChangeupd = (event) => {
        const { name, value } = event.target;
        setUserData({ ...User, [name]: value })
        console.log(name, value);
    
    
    }
    
    const handleUpdate = (event) => {
        event.preventDefault()
    
        const UserData = {
    
            userid: User.userid,
            name: User.name,
            email: User.email,
            designation: User.designation,
            phoneno: User.phoneno,
            password: User.password,
    
        }
        fetch(`http://localhost:6060/user/update/${User.id}`, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserData),
    
        })
            .then((res) => {
                console.log(res);
            })
            .then((err) => {
                console.log(err);
            })
        console.log(UserData);
    }
    
    
    // ------EMPLOYEE DELETE ----------------------------    
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleDelete = (i) => {
        fetch(`http://localhost:6060/user/delete/${i}`, {
            method: "get"
        },
            Employees.splice(i, 1)
        )
    };
    
    useEffect(() => {
        fetch("http://localhost:6060/user/get"
        ).then(response => response.json())
            .then(data => {
    
                console.log(data);
                setEmployee(data);
    
            })
    
    }, []);    

return(
    <>
    <div className="container-fluid">
        <div className="container pt-5 pb-5">
            <label className="fs-2 fw-bolder pt-2 pb-3">Employee Details</label>
        <Table striped bordered hover>
        <thead>
            <tr className='text-center'>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th>Mobile No</th>
                <th>Password</th>
                <th>Edit/Delete</th>
            </tr>
        </thead>
        {Array.isArray(Employees) && Employees.map((employ) => (
            <tbody key={employ.id}>
                <tr>
                    <td>{employ.userid}</td>
                    <td>{employ.name}</td>
                    <td>{employ.email}</td>
                    <td>{employ.designation}</td>
                    <td>{employ.phoneno}</td>
                    <td>{employ.password}</td>
                    <td className='text-center'>
                        <button className='border-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>
                        </button>&nbsp;
                        <button className='border-0' onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                            </svg>
                        </button>&nbsp;
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Basic Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <label>Name: </label><br />
                                        <label>Email: </label><br />
                                        <label>Mobile: </label><br />
                                        <label>Designation: </label><br />
                                        <label>Password:</label>
                                    </div>
                                    <div className="col">
                                        <input type="text" name="name" value={employ.name} onChange={handleChangeupd} />
                                        <input type="text" name="email" value={employ.email} onChange={handleChangeupd} />
                                        <input type="text" name="phoneno" value={employ.phoneno} onChange={handleChangeupd} />
                                        <input type="text" name="designation" value={employ.designation} onChange={handleChangeupd} />
                                        <input type="text" name="password" value={employ.password} onChange={handleChangeupd} />
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="bg-secondary p-2 text-white border-0 rounded" onClick={handleClose}>
                                    Close
                                </button>
                                <button className='bg-primary p-2 text-white border-0 rounded'  onClick={handleUpdate}>
                                    Save Changes
                                </button>
                            </Modal.Footer>
                        </Modal>
                        <button className='border-0' onClick={() => handleDelete(employ.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                        </button> &nbsp;
                    </td>
                </tr>
            </tbody>
        ))}

    </Table>
        </div>
    
</div>
    
    
    </>
)
}





export default EmployeeDetails ;