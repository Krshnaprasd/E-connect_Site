import  { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const HR = () =>{
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
   

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  

  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleShow3= () => setShow3(true);
 

  const sub = () =>{
    alert("Application sent")
  }
//   let id = localStorage.getItem("id")

  const[attend, setAttendData] = useState([])



  useEffect(() => {
    fetch("http://localhost:6060/attend/get", {

      })
      .then(response => response.json())
      .then(data => {

        // console.log("================================= attend data =====" + data);
        setAttendData(data)

      })

  }, [])
return(
    <div className='project'>
    <div className="container-fluid project pt-5 pb-5">
    <div className="container">
        <div className="d-flex justify-content-center ppb-5"><span className="fs-1 fw-bold">MY HR</span></div>
        <div className="row pt-5 pb-5 row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 justify-content-around">
        <div className="card mincard col p-5">
            
            <div className="row justify-content-center text-white-50 pb-3"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-wallet2" viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/>
                </svg></div>
                
                <button className='border-0 bar p-1 fs-5 text-white bg-none' onClick={handleShow}>
                    Salary
                </button>
                
                <Modal show={show} onHide={handleShow} size='sm' >
                    
                    <Modal.Header>
                    <Modal.Title className='fw-bold'>Salary Slip</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                           
                             <label>Basic Salary:{attend.basic_salary}<span></span></label><br></br>
                            <label>Travel Allowance:{attend.ta}<span></span></label><br></br>
                            <label>Food Allowance:{attend.fa}<span></span></label><br></br>
                            <label>PF:{attend.pf}<span></span></label><br></br>
                            <label>ESI:{attend.esi}<span></span></label><br></br><hr></hr>
                            <label>Overall Salary:{attend.overall_salary}<span></span></label> 
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
               
            </div>
            <div className="card mincard col p-5">
            <div className="row justify-content-center pb-3 text-white-50"> <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-calendar-week" viewBox="0 0 16 16">
                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg></div>
               <button className='border-0 bg-none bar p-1 fs-5 text-white' onClick={handleShow1}>
                Attendance
               </button>
               
                <Modal onHide={handleShow1} show={show1} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Attendance Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      
                            <label>No.of Working days:{attend.workingdays}<span></span></label><br></br>
                            <label>No.of Holidays:{attend.holidays}<span></span></label><br></br>
                            <label>No.of Present:{attend.present}<span></span></label><br></br>
                            <label>No.of CL/SL:{attend.cl_sl}<span></span></label><br></br>
                            <label>No.of LOPs:{attend.lop}<span></span></label><br></br>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose1}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
              
            </div>
            <div className="card mincard col p-5">
            <div className="row pb-3 text-white-50"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-clipboard2" viewBox="0 0 16 16">
            <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z"/>
            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
            </svg></div>
                <button className='border-0 bg-none text-white bar p-1 fs-5' onClick={handleShow2}>
                    Job Openings
                </button>
                <Modal show={show2} onHide={handleShow2} size='sm'>
                    <Modal.Header>
                    <Modal.Title className='fw-bold'>Internal Job Openings</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <label>Manager: <span></span></label><br></br>
                            <label>Team Lead: <span></span></label><br></br>
                            <label>Senior Developer: <span></span></label><br></br>
                            <label>Junior Developer: <span></span></label> <br></br>
                            <label>FrontEnd Developer: <span></span></label><br></br>
                            <label>BackEnd Developer: <span></span></label><br></br>
                            <label>Training Tutors: <span></span></label><br></br>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleShow3}>
                        Apply
                    </Button>   
                    <Modal show={show3} onHide={handleShow3} size='sm'>
                    <Modal.Header>
                    <Modal.Title className='fw-bold'>Application Form</Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>Username:</label>
                            <input type="text"></input>
                            <label>Email:</label>
                            <input type="text"></input>
                            <label>Select:</label>
                            <Form.Select aria-label="Default select example">
                            <option>options</option>
                            <option value="1">Manager</option>
                            <option value="2">Team Lead</option>
                            <option value="3">Senior Developer</option>
                            <option value="4">Junior Developer</option>
                            <option value="5">FrontEnd Developer</option>
                            <option value="6">BackEnd Developer</option>
                            <option value="7">Training Tutors</option>
                            </Form.Select><br></br>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose3}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose2}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
        </div>
        </div>
        <div className='container-fluid project pt-5 pb-5'>

        </div>
        </div>
  
)    
}
export default HR;