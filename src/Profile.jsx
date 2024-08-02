import {useEffect,useState} from 'react'
import Card from 'react-bootstrap/Card';
import { Modal, Button } from 'react-bootstrap';



const Profile = () =>{
    
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  // const [show3, setShow3] = useState(false);
  // const [show4, setShow4] = useState(false);


  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  

  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);

  




  const [User, setUserData]= useState({
   
    id:'',
    name:'',
    email: '',
    designation:'',
    phoneno:'',
    password:'',

    })
    
    const handleChange = (event) => {
        const{name, value} = event.target;
        setUserData({...User, [name]:value})
        console.log(name,value);
       
    
    }

    const handleSubmit = (event) => {
        event.preventDefault()
       
        const UserData={
            
            id:User.id,
            name:User.name,
            email:User.email,
            designation:User.designation,
            phoneno:User.phoneno,
            password:User.password,

        }
        fetch(`http://localhost:6060/user/update/${User.id}`,{
            method:"post",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(UserData),
            
        })
        .then((res) =>{
                console.log(res);
        })
        .then((err)=>{
            console.log(err);
        })

    console.log(UserData);
    }

  const[address, setAddressData] = useState({

    address:'',
    location:'',
    city:'',
    state:'',
    pincode:''
  })

  const handleaddChange = (event) =>{
    const{name, value} = event.target;
    setAddressData({...address, [name]:value})
    console.log(name,value);
  }

  const sub = () =>{
    const AddressData={

        address:address.address,
        location:address.location,
        city:address.city,
        state:address.state,
        pincode:address.pincode,
      

    }
    fetch("http://localhost:6060/address/set",{
        method:"post",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(AddressData),
        
    })
    .then((res) =>{
            console.log(res);
    })
    .then((err)=>{
        console.log(err);
    })
console.log(AddressData);
  }

  const[bank, setBankData] = useState({
    id:'',
    bank:'',
    accountno:'',
    ifsccode:'',
    branch:'',
    pf:'',
    esi:''
  })

  const handlebankChange = (event) => {
    const{name, value} = event.target;
    setBankData({...bank, [name]:value})
    console.log(name,value);
     
  }

  const submitbank = () =>{
    const BankData={
        id:User.id,
        bank:bank.bank,
        ifsccode:bank.ifsccode,
        pf:bank.pf,
        esi:bank.esi,
        branch:bank.branch,
        accountno:bank.accountno,
    }
    fetch("http://localhost:6060/bank/set",{
        method:"post",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(BankData),
        
    })
    .then((res) =>{
            console.log(res);
    })
    .then((err)=>{
        console.log(err);
    })
console.log(BankData);
  }

return(
    <>
    <div className="container-fluid mincard pt-5">
        <div className="container">
        <div className='text-center fs-1 fw-bold pb-2 text-white-50'><p>MY PROFILE</p></div>
            <div className="row row-cols-lg-4 row-cols-1 justify-content-around">
                <div className="col-md-3 pb-5 col-sm-6 col-12">
               
                <Card>
                        <Card.Img variant="top" src="https://cdn.dribbble.com/users/1138853/screenshots/4841628/28_34_gif.gif" />
                        <Card.Body>
                          <Card.Title className='text-center fw-bold'>Basic Details</Card.Title>
                          <Card.Text className='small algn'>
                          Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                        <button className='bg-primary border-0 pe-5 ps-5 p-1 text-white' onClick={handleShow} variant='primary'>Edit</button>
                                      <Modal show={show} onHide={handleShow} size='sm'>
                                  <Modal.Header>
                                  <Modal.Title className='fw-bold'>Basic Details</Modal.Title>
                                  </Modal.Header>
                                  <div className='d-grid justify-content-center'>
                                  <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                                      

                                          <label>Name:</label>
                                          <input type="text" name="name"  value={User.name} onChange={handleChange}></input>
                                          <label>Email:</label>
                                          <input type="text" name="email"  value={User.email} onChange={handleChange}></input>
                                          <label>Mobile No:</label>
                                          <input type="text" name="phoneno"  value={User.phoneno} onChange={handleChange}></input>
                                          <label>Designation:</label>
                                          <input type="text" name="designation"  value={User.designation} onChange={handleChange}></input>
                                          <label>Reset Password:</label>
                                          <input type="text" name="password"  value={User.password} onChange={handleChange}></input>
                                  </Modal.Body></div>
                                  <Modal.Footer>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleSubmit}>
                                      Submit
                                  </Button>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose}>
                                      Close
                                  </Button>
                                  </Modal.Footer>
                              </Modal>
                        </Card.Footer>
                      </Card>
                </div>
                <div className="col-md-3 pb-5 col-sm-6 col-12">
                <Card>
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/19/97/f3/1997f3da28e8d29289097871f45b04fd.gif" />
                        <Card.Body>
                          <Card.Title className='text-center fw-bold'>Personal Details</Card.Title>
                          <Card.Text className='small algn'>
                          Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                        <button className='bg-primary border-0 pe-5 ps-5 p-1 text-white' onClick={handleShow1} variant="primary">Know more</button>
                                      <Modal show={show1} onHide={handleShow1} size='sm'>
                                  <Modal.Header>
                                  <Modal.Title className='fw-bold'>Personal Details</Modal.Title>
                                  </Modal.Header>
                                  <div className='d-grid justify-content-center'>
                                  <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
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
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' >
                                      Edit
                                  </Button>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                                      Submit
                                  </Button>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose1}>
                                      Close
                                  </Button>
                                  </Modal.Footer>
                              </Modal>                        
                        </Card.Footer>
                      </Card>
                </div>
                <div className="col-md-3 pb-5 col-sm-6 col-12">
                <Card>
                        <Card.Img variant="top" src="https://cdn.dribbble.com/users/20368/screenshots/3953268/api_anim.gif" />
                        <Card.Body>
                          <Card.Title className='text-center fw-bold'>Bank Details</Card.Title>
                          <Card.Text className='small algn'>
                          Ensure that the platform you use is secure and legitimate to protect your sensitive information from unauthorized access or potential misuse.
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer className='text-center'>
                        <button className='bg-primary border-0 pe-5 ps-5 p-1 text-white' onClick={handleShow2} variant="primary">Know more</button>
                                      <Modal show={show2} onHide={handleShow2} size='sm'>
                                  <Modal.Header>
                                  <Modal.Title className='fw-bold'>Bank Details</Modal.Title>
                                  </Modal.Header>
                                  <div className='d-grid justify-content-center'>
                                  <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>

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
                                  <Modal.Footer>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={submitbank}>
                                      Submit
                                  </Button>
                                  <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose2}>
                                      Close
                                  </Button>
                                  </Modal.Footer>
                              </Modal>                        </Card.Footer>
                      </Card>
                </div>
            </div>
        </div>
    </div>

    </>
)    
}
export default Profile;