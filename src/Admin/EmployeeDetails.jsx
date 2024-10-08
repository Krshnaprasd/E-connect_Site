import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

const EmployeeDetails = () => {
    const [Employees, setEmployee] = useState([]);
    const [User, setUserData] = useState({
        userid: '',
        name: '',
        email: '',
        designation: '',
        phoneno: '',
        password: '',
        confirmpassword: '',
        address: '',
        city: '',
        state: '',
        location: '',
        pincode: '',
        bank: '',
        accountno: '',
        ifsccode: '',
        pf: '',
        esi: '',
        branch: '',
    });

    const handleChangeupd = (event) => {
        const { name, value } = event.target;
        setUserData({ ...User, [name]: value });
        console.log(name, value);
    };

    const validateFields = () => {
        const requiredFields = [
            'name', 'email', 'designation', 'phoneno', 'password', 'confirmpassword',
            'address', 'city', 'state', 'location', 'pincode',
            'bank', 'accountno', 'ifsccode', 'pf', 'esi', 'branch'
        ];

        for (let field of requiredFields) {
            if (!User[field]) {
                Swal.fire({
                    title: 'Error',
                    text: `${field.replace('_', ' ')} is required.`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
                return false;
            }
        }

        if (User.password !== User.confirmpassword) {
            Swal.fire({
                title: 'Error',
                text: 'Passwords do not match.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            return false;
        }

        return true;
    };


    let addressId;
    let bankId;

    // Function to update user details
    const updateEmployee = () => {
        const userId = User.userid

        // Prepare user data
        const updatedUserData = {

            name: User.name,
            email: User.email,
            designation: User.designation,
            phoneno: User.phoneno,
            password: User.password,
        };

        fetch(`http://localhost:6060/user/updateuser/${userId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUserData),
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({ title: 'User Updated Successfully', icon: 'success', confirmButtonText: 'Close' });
                console.log(data);
                addressId = data.address[0].addressid
                bankId = data.bank[0].bankid
                console.log(addressId);
                console.log(bankId);




                AddressSend(userId, addressId);  // Call address update after user update
                BankSend(userId, bankId);     // Call bank update after user update
                fetchEmployees()
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({ title: 'Error', text: 'Failed to update user.', icon: 'error', confirmButtonText: 'Close' });
            });
        setShow(false)
    };

    // Function to update address for a specific userid and addressid
    const AddressSend = (userId, addressId) => {
        const updatedAddressData = {

            address: User.address,
            city: User.city,
            state: User.state,
            location: User.location,
            pincode: User.pincode,
        };


        fetch(`http://localhost:6060/address/updateAddress/${userId}/${addressId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedAddressData),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Address updated:', data);
            })
            .catch(error => {
                console.error('Error updating address:', error);
            });
    };

    // Function to update bank for a specific userid and bankid
    const BankSend = (userId, bankId) => {
        const updatedBankData = {
            bank: User.bank,
            accountno: User.accountno,
            ifsccode: User.ifsccode,
            branch: User.branch,
            pf: User.pf,
            esi: User.esi,
        };

        fetch(`http://localhost:6060/bank/updateBank/${userId}/${bankId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBankData),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Bank details updated:', data);
            })
            .catch(error => {
                console.error('Error updating bank:', error);
            });
    };

    const fetchEmployees = () => {
        fetch("http://localhost:6060/user/get")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setEmployee(data);
            });
    };

    const handleDelete = (userId) => {
        fetch(`http://localhost:6060/user/deleteuser/${userId}`, {
            method: "DELETE"
        })
            .then(() => {
                setEmployee(Employees.filter(employee => employee.userid !== userId));
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const [show, setShow] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null); 

    const handleClose = () => setShow(false);
    const handleShow = (employee) => {
        setCurrentEmployee(employee);
        setUserData({
            userid: employee.userid,
            name: employee.name,
            email: employee.email,
            designation: employee.designation,
            phoneno: employee.phoneno,
            password: employee.password,
            confirmpassword: employee.confirmpassword,
            address: employee.address.length > 0 ? employee.address[0].address : '', 
            city: employee.address.length > 0 ? employee.address[0].city : '',
            state: employee.address.length > 0 ? employee.address[0].state : '',
            location: employee.address.length > 0 ? employee.address[0].location : '',
            pincode: employee.address.length > 0 ? employee.address[0].pincode : '',
            // Extracting values from bank array
            bank: employee.bank.length > 0 ? employee.bank[0].bank : '', 
            accountno: employee.bank.length > 0 ? employee.bank[0].accountno : '',
            ifsccode: employee.bank.length > 0 ? employee.bank[0].ifsccode : '',
            pf: employee.bank.length > 0 ? employee.bank[0].pf : '',
            esi: employee.bank.length > 0 ? employee.bank[0].esi : '',
            branch: employee.bank.length > 0 ? employee.bank[0].branch : '',
        });
        setShow(true);
    };

    return (
        <>
            <div className="container-fluid ">
                <div className="container pt-5 pb-5">
                    <label className="fs-2 fw-bolder pt-2 pb-3">Employee Details</label>
                    <div className="row">
                        <Table>
                            <thead className='table-primary'>
                                <tr className='text-center'>
                                    {/* <th>ID</th> */}
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Designation</th>
                                    <th>Mobile No</th>
                                    <th>Password</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {Array.isArray(Employees) && Employees.map((employ) => (
                                    <tr key={employ.userid}>
                                        {/* <td>{employ.userid}</td> */}
                                        <td>{employ.name}</td>
                                        <td>{employ.email}</td>
                                        <td>{employ.designation}</td>
                                        <td>{employ.phoneno}</td>
                                        <td>{employ.password}</td>
                                        <td className='text-center'>
                                            <button className='border-0' onClick={() => handleShow(employ)}>
                                                {/* Eye icon for viewing */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </button>  &nbsp;
                                            <button className='border-0' onClick={() => handleDelete(employ.userid)}>
                                                {/* Trash can icon for deleting */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>


                    {/* Edit Employee Modal */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                {/* Employee Name */}
                                <div className="mb-2">
                                    <label>Name</label>
                                    <input type="text" name="name" value={User.name} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Employee Email */}
                                <div className="mb-2">
                                    <label>Email</label>
                                    <input type="email" name="email" value={User.email} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Employee Designation */}
                                <div className="mb-2">
                                    <label>Designation</label>
                                    <input type="text" name="designation" value={User.designation} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Employee Mobile No */}
                                <div className="mb-2">
                                    <label>Mobile No</label>
                                    <input type="text" name="phoneno" value={User.phoneno} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Employee Password */}
                                <div className="mb-2">
                                    <label>Password</label>
                                    <input type="password" name="password" value={User.password} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-2">
                                    <label>Confirm Password</label>
                                    <input type="password" name="confirmpassword" value={User.confirmpassword} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Address Fields */}
                                <div className="mb-2">
                                    <label>Address</label>
                                    <input type="text" name="address" value={User.address} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>City</label>
                                    <input type="text" name="city" value={User.city} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>State</label>
                                    <input type="text" name="state" value={User.state} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>Location</label>
                                    <input type="text" name="location" value={User.location} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>Pin Code</label>
                                    <input type="text" name="pincode" value={User.pincode} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Bank Details Fields */}
                                <div className="mb-2">
                                    <label>Bank Name</label>
                                    <input type="text" name="bank" value={User.bank} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>Account Number</label>
                                    <input type="text" name="accountno" value={User.accountno} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>IFSC Code</label>
                                    <input type="text" name="ifsccode" value={User.ifsccode} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>Branch</label>
                                    <input type="text" name="branch" value={User.branch} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>PF</label>
                                    <input type="text" name="pf" value={User.pf} onChange={handleChangeupd} className="form-control" />
                                </div>
                                <div className="mb-2">
                                    <label>ESI</label>
                                    <input type="text" name="esi" value={User.esi} onChange={handleChangeupd} className="form-control" />
                                </div>

                                {/* Add more fields as needed */}
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={updateEmployee}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default EmployeeDetails;
