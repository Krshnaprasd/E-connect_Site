import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


const Profile = () => {


    // Employee Rendering

    const [employee, setEmployee] = useState([]);
    
    const userid = localStorage.getItem("id")


    const fetchEmployees = () => {
        fetch(`http://localhost:6060/user/get/${userid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEmployee(data);
            });
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // ==================================================================



    // =============================================================================
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);


    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);

    //==================================================================================

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleSelectEmployee = (employee) => {
        setSelectedEmployee(employee);

        setUserData({
            userid: employee.userid,
            name: employee.name,
            email: employee.email,
            designation: employee.designation,
            phoneno: employee.phoneno,
            password: employee.password
        });


        setBankData({
            bankId: employee.bank[0].bankid,
            bank: employee.bank[0].bank,
            accountno: employee.bank[0].accountno,
            ifsccode: employee.bank[0].ifsccode,
            branch: employee.bank[0].branch,
            pf: employee.bank[0].pf,
            esi: employee.bank[0].esi
        });

        setAddressData({
            addressId: employee.address[0].addressid,
            address: employee.address[0].address,
            location: employee.address[0].location,
            city: employee.address[0].city,
            state: employee.address[0].state,
            pincode: employee.address[0].pincode

        })
        setShow(true);
    };

    //  ===============================================================================================    

    const [User, setUserData] = useState({

        id: '',
        name: '',
        email: '',
        designation: '',
        phoneno: '',
        password: '',

    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...User, [name]: value })
        console.log(name, value);


    }

    const handleSubmit = () => {
        const userId = User.userid;
        console.log(userId);
    
        const UserData = {
            userId: User.userid,
            name: User.name,
            email: User.email,
            designation: User.designation,
            phoneno: User.phoneno,
            password: User.password,
        };
    
        fetch(`http://localhost:6060/user/updateuser/${userId}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(UserData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json(); // Parse the JSON response
            })
            .then((data) => {
                Swal.fire({ title: 'User Updated Successfully', icon: 'success', confirmButtonText: 'Close' });
                console.log(data);
                fetchEmployees()
            })
            .catch((err) => {
                Swal.fire({ title: 'Error', text: 'Failed to update user.', icon: 'error', confirmButtonText: 'Close' });
                console.error(err);
            });
    
        handleClose(true);
    }
    

    const [address, setAddressData] = useState({

        address: '',
        location: '',
        city: '',
        state: '',
        pincode: ''
    })

    const handleaddChange = (event) => {
        const { name, value } = event.target;
        setAddressData({ ...address, [name]: value })
        console.log(name, value);
    }

    const sub = () => {
        const userId = User.userid;
        const addressId = address.addressId; // Ensure that you correctly retrieve the addressId
        console.log(userId);
        console.log(addressId);
    
        const AddressData = {
            address: address.address,
            location: address.location,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
        };
    
        fetch(`http://localhost:6060/address/updateAddress/${userId}/${addressId}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AddressData),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json(); // Parse the JSON response
        })
        .then((data) => {
            Swal.fire({ title: 'Address Updated Successfully', icon: 'success', confirmButtonText: 'Close' });
            console.log(data);
            fetchEmployees(); // Fetch the updated employee list or whatever is necessary
        })
        .catch((err) => { // Use .catch() for error handling
            Swal.fire({ title: 'Error', text: 'Failed to update address.', icon: 'error', confirmButtonText: 'Close' });
            console.error(err);
        });
    
        handleClose1(true); // Move this inside the success or error handling as needed
    }
    
    const [bank, setBankData] = useState({
        id: '',
        bank: '',
        accountno: '',
        ifsccode: '',
        branch: '',
        pf: '',
        esi: ''
    })

    const handlebankChange = (event) => {
        const { name, value } = event.target;
        setBankData({ ...bank, [name]: value })
        console.log(name, value);

    }

    const submitbank = () => {
    const userId = User.userid;
    const bankId = bank.bankId; // Ensure bankId is correctly retrieved
    console.log(userId);
    console.log(bankId);

    const BankData = {
        bank: bank.bank,
        ifsccode: bank.ifsccode,
        pf: bank.pf,
        esi: bank.esi,
        branch: bank.branch,
        accountno: bank.accountno,
    };

    fetch(`http://localhost:6060/bank/updateBank/${userId}/${bankId}`, {
        method: "put",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(BankData),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json(); // Parse the JSON response
    })
    .then((data) => {
        Swal.fire({ 
            title: 'Bank Updated Successfully', 
            icon: 'success', 
            confirmButtonText: 'Close' 
        }).then(() => {
            handleClose2(true); // Close after alert is dismissed
        });
        console.log(data);
        fetchEmployees(); // Fetch the updated list or whatever is necessary
    })
    .catch((err) => { // Use .catch() for error handling
        Swal.fire({ 
            title: 'Error', 
            text: 'Failed to update bank.', 
            icon: 'error', 
            confirmButtonText: 'Close' 
        });
        console.error(err);
    });
}


    return (
        <>
            <div className="container-fluid pfcard pt-5 pb-5">
                <div className="container pt-5">
                    
                        <div className="row row-cols-lg-4 row-cols-1 justify-content-around" key={employee.userid}>

                            <div className="col-md-3 pb-5 col-sm-6 col-12">

                                <Card className='p-2'>
                                    <Card.Img variant="top" src="https://cdn.dribbble.com/users/1138853/screenshots/4841628/28_34_gif.gif" />
                                    <Card.Body>
                                        <Card.Title className='text-center fw-bold'>Basic Details</Card.Title>
                                        <Card.Text className='small algn'>
                                            Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                                        </Card.Text>
                                    </Card.Body>

                                    <button className='bg-primary prcard border-0 pe-5 ps-5 p-1 text-white fw-bolder' key={employee.id} onClick={() => handleSelectEmployee(employee)}  >Edit</button>
                                    <Modal show={show} onHide={handleShow} size='sm'>
                                        <Modal.Header>
                                            <Modal.Title className='fw-bold'>Basic Details</Modal.Title>
                                        </Modal.Header>
                                        <div className='d-grid justify-content-center'>
                                            <Modal.Body className='d-grid justify-center' style={{ width: '18em' }}>


                                                <label>Name:</label>
                                                <input type="text" name="name" value={User.name} onChange={handleChange}></input>
                                                <label>Email:</label>
                                                <input type="text" name="email" value={User.email} onChange={handleChange}></input>
                                                <label>Mobile No:</label>
                                                <input type="text" name="phoneno" value={User.phoneno} onChange={handleChange}></input>
                                                <label>Designation:</label>
                                                <input type="text" name="designation" value={User.designation} onChange={handleChange}></input>
                                                <label>Reset Password:</label>
                                                <input type="text" name="password" value={User.password} onChange={handleChange}></input>
                                            </Modal.Body></div>
                                        <Modal.Footer className='justify-content-center'>
                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Card>
                            </div>
                            <div className="col-md-3 pb-5 col-sm-6 col-12">
                                <Card className='p-2'>
                                    <Card.Img variant="top" src="https://i.pinimg.com/originals/19/97/f3/1997f3da28e8d29289097871f45b04fd.gif" />
                                    <Card.Body>
                                        <Card.Title className='text-center fw-bold'>Personal Details</Card.Title>
                                        <Card.Text className='small algn'>
                                            Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                                        </Card.Text>
                                    </Card.Body>

                                    <button className='bg-primary prcard border-0 pe-5 ps-5 p-1 text-white fw-bolder' onClick={handleShow1} >Edit</button>
                                    <Modal show={show1} onHide={handleShow1} size='sm'>
                                        <Modal.Header>
                                            <Modal.Title className='fw-bold'>Personal Details</Modal.Title>
                                        </Modal.Header>
                                        <div className='d-grid justify-content-center'>
                                            <Modal.Body className='d-grid justify-center' style={{ width: '18em' }}>
                                                <label>Address:</label>
                                                <input type="text" name="address" value={address.address} onChange={handleaddChange}></input>
                                                <label>Location:</label>
                                                <input type="text" name="location" value={address.location} onChange={handleaddChange}></input>
                                                <label>City:</label>
                                                <input type="text" name="city" value={address.city} onChange={handleaddChange}></input>
                                                <label>State:</label>
                                                <input type="text" name="state" value={address.state} onChange={handleaddChange}></input>
                                                <label>Pincode:</label>
                                                <input type="text" name="pincode" value={address.pincode} onChange={handleaddChange}></input>
                                            </Modal.Body></div>
                                        <Modal.Footer className='justify-content-center'>

                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                                                Submit
                                            </Button>
                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose1}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Card>
                            </div>
                            <div className="col-md-3 pb-5 col-sm-6 col-12">
                                <Card className='p-2'>
                                    <Card.Img variant="top" src="https://cdn.dribbble.com/users/20368/screenshots/3953268/api_anim.gif" />
                                    <Card.Body>
                                        <Card.Title className='text-center fw-bold'>Bank Details</Card.Title>
                                        <Card.Text className='small algn'>
                                            Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                                        </Card.Text>
                                    </Card.Body>

                                    <button className='bg-primary prcard border-0 pe-5 ps-5 p-1 fw-bolder text-white' onClick={handleShow2} >Edit</button>
                                    <Modal show={show2} onHide={handleShow2} size='sm'>
                                        <Modal.Header>
                                            <Modal.Title className='fw-bold'>Bank Details</Modal.Title>
                                        </Modal.Header>
                                        <div className='d-grid justify-content-center'>
                                            <Modal.Body className='d-grid justify-center' style={{ width: '18em' }}>

                                                <label>Bank:</label>
                                                <input type="text" name="bank" value={bank.bank} onChange={handlebankChange}></input>
                                                <label>Account No:</label>
                                                <input type="text" name="accountno" value={bank.accountno} onChange={handlebankChange}></input>
                                                <label>IFSC Code:</label>
                                                <input type="text" name="ifsccode" value={bank.ifsccode} onChange={handlebankChange}></input>
                                                <label>Branch:</label>
                                                <input type="text" name="branch" value={bank.branch} onChange={handlebankChange}></input>
                                                <label>PF:</label>
                                                <input type="text" name="pf" value={bank.pf} onChange={handlebankChange}></input>
                                                <label>ESI:</label>
                                                <input type="text" name="esi" value={bank.esi} onChange={handlebankChange}></input>
                                            </Modal.Body></div>
                                        <Modal.Footer className='justify-content-center'>
                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={submitbank}>
                                                Submit
                                            </Button>
                                            <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose2}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Card>

                            </div>

                        </div>
                  
                </div>
            </div>

        </>
    )
}
export default Profile;