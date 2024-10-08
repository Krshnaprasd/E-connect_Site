import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Swal from 'sweetalert2';
import { Carousel } from 'react-bootstrap';

const AdminPanel = () => {


  // --------ADD EMPLOYEE TABLE -----------------------------------

 

  const [admin] = [
    {
      img: "../src/assets/About.avif",
    }
  ]

  const [staff, setStaffData] = useState({
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
    branch: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStaffData({ ...staff, [name]: value });
  };

  const validateFields = () => {
    const requiredFields = [
      'name', 'email', 'designation', 'phoneno', 'password', 'confirmpassword',
      'address', 'city', 'state', 'location', 'pincode',
      'bank', 'accountno', 'ifsccode', 'pf', 'esi', 'branch'
    ];

    for (let field of requiredFields) {
      if (!staff[field]) {
        Swal.fire({
          title: 'Error',
          text: `${field.replace('_', ' ')} is required.`,
          icon: 'error',
          confirmButtonText: 'Close'
        });
        return false;
      }
    }

    if (staff.password !== staff.confirmpassword) {
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

  const submit = () => {
    if (!validateFields()) {
      return;
    }

    const staffData = {
      name: staff.name,
      email: staff.email,
      designation: staff.designation,
      phoneno: staff.phoneno,
      password: staff.password,
      confirmpassword: staff.confirmpassword,
    };

    fetch("http://localhost:6060/user/set", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const userId = data.userid;
        localStorage.setItem("userId", userId);
        AddressSend(userId);
        BankSend(userId);
        Swal.fire({
          title: 'Employee Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close'
        });
        resetForm(); // Reset form after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add employee.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });

    console.log(staffData);
  };

  const AddressSend = (userId) => {
    let address = {
      user_id: userId,
      address: staff.address,
      location: staff.location,
      city: staff.city,
      state: staff.state,
      pincode: staff.pincode,
    };

    fetch(`http://localhost:6060/address/set/${userId}`, {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(address),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const BankSend = (userId) => {
    let bank = {
      bank: staff.bank,
      ifsccode: staff.ifsccode,
      pf: staff.pf,
      esi: staff.esi,
      branch: staff.branch,
      accountno: staff.accountno,
    };

    fetch(`http://localhost:6060/bank/set/${userId}`, {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bank),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const resetForm = () => {
    setStaffData({
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
      branch: ''
    });
  };

  return (
    <>
      <div className="container-fluid pt-3">
        <div className="container">
          <div className="text-center fs-3 fw-bold">
            <p>ADMIN DASHBOARD</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="container">
          <Nav fill variant="tabs">
            <Nav.Item>
              <Nav.Link href="/admin/employ">Employees</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/admin">Add Employees</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/admin/attend">Attendance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/admin/ctc">Salary</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="admin/vacant">Job openings</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
      <div className="container-fluid pt-3" >
        <div className="container">
          {/* <div className="row text-center pt-3 "  >
            <label className="fs-4 fw-bolder">ADD USERS</label><br /><br />
          
            <div className="col-lg-4 pt-3" style={{ lineHeight: "20px" }}>

              <input type="text" placeholder='Enter your name' name="name" value={staff.name} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your email' name="email" value={staff.email} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your mobile' name="phoneno" value={staff.phoneno} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Designation' name="designation" value={staff.designation} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Set Password' name="password" value={staff.password} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Confirm Password' name="confirmpassword" value={staff.confirmpassword} onChange={handleChange}></input><br /><br />
            </div>
            <div className="col-lg-4 pt-4" style={{ lineHeight: "20px" }}>
              <input type="text" placeholder='Enter your address' name="address" value={staff.address} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your location' name="location" value={staff.location} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your city' name="city" value={staff.city} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your state' name="state" value={staff.state} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your pincode' name="pincode" value={staff.pincode} onChange={handleChange}></input><br /><br />
            </div>
            <div className="col-lg-4 pt-3" style={{ lineHeight: "20px" }}>
              <input type="text" placeholder='Enter your Bank' name="bank" value={staff.bank} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your AccountNo' name="accountno" value={staff.accountno} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your IFSC code' name="ifsccode" value={staff.ifsccode} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='Enter your branch' name="branch" value={staff.branch} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='PF' name="pf" value={staff.pf} onChange={handleChange}></input><br /><br />
              <input type="text" placeholder='ESI' name="esi" value={staff.esi} onChange={handleChange}></input>
            </div>
          </div>
          <div className='text-center'>
          <button style={{width:250}} className="admin-butn p-2 butn mt-3 mb-3 fw-semibold text-white" onClick={submit}>Submit</button>
          </div> */}
          <div className="row d-flex justify-content-around">
            <div className="col-md-5 d-lg-block d-none align-content-center">
            <img className='img-fluid'  src={admin.img} alt="" />
            </div>
            <div className="col-md-5">
            <Carousel interval={null}>
            {/* User Details Slide */}
            <Carousel.Item>
                <div className="row text-center pt-5 pb-3">
                    <label className="fs-4 fw-bolder">BASIC DETAILS</label><br></br>
                    <div className="col-lg-12 pt-3" style={{ lineHeight: "20px" }}>
                        <input type="text" placeholder='Enter your name' name="name" value={staff.name} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your email' name="email" value={staff.email} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your mobile' name="phoneno" value={staff.phoneno} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Designation' name="designation" value={staff.designation} onChange={handleChange} /><br /><br />
                        <input type="password" placeholder='Set Password' name="password" value={staff.password} onChange={handleChange} /><br /><br />
                        <input type="password" placeholder='Confirm Password' name="confirmpassword" value={staff.confirmpassword} onChange={handleChange} /><br /><br />
                    </div>
                </div>
            </Carousel.Item>

            {/* Address Details Slide */}
            <Carousel.Item>
                <div className="row text-center pt-5 pb-3">
                    <label className="fs-4 fw-bolder">ADDRESS DETAILS</label>
                    <div className="col-lg-12 pt-3" style={{ lineHeight: "20px" }}>
                        <input type="text" placeholder='Enter your address' name="address" value={staff.address} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your location' name="location" value={staff.location} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your city' name="city" value={staff.city} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your state' name="state" value={staff.state} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your pincode' name="pincode" value={staff.pincode} onChange={handleChange} /><br /><br />
                    </div>
                </div>
            </Carousel.Item>

            {/* Bank Details Slide */}
            <Carousel.Item>
                <div className="row text-center pt-md-5 pt-3 pb-3">
                    <label className="fs-4 fw-bolder">BANK DETAILS</label>
                    <div className="col-lg-12 pt-3" style={{ lineHeight: "20px" }}>
                        <input type="text" placeholder='Enter your Bank' name="bank" value={staff.bank} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your AccountNo' name="accountno" value={staff.accountno} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your IFSC code' name="ifsccode" value={staff.ifsccode} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='Enter your branch' name="branch" value={staff.branch} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='PF' name="pf" value={staff.pf} onChange={handleChange} /><br /><br />
                        <input type="text" placeholder='ESI' name="esi" value={staff.esi} onChange={handleChange} />
                        <div className='text-center'>
                        <button style={{ width: 250 }} className="admin-butn p-2 butn mt-3 mb-3 fw-semibold text-white" onClick={submit}>Submit</button>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
            </div>
          </div>
          
           
        </div>
      </div>
    </>
  );
};

export default AdminPanel;