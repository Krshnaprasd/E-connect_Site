import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import salary from './assets/salarymini.jpg';
import mark from './assets/markattend.jpg';
import job from './assets/job.jpg'

const HR = () => {

    const userId = localStorage.getItem("id");
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
   
    


    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);



    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);

  
   
    //   let id = localStorage.getItem("id")

    const [salaryData, setSalaryData] = useState([]);
    const [AttendData, setAttendData] = useState([]);

    useEffect(() => {
        console.log('Fetching salary data for user ID:', userId);
        
        fetch(`http://localhost:6060/salary/get/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch salary data');
                }
                return response.json();
            })
            .then(data => {
                setSalaryData(data);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching salary data:', error);
            });
    }, [userId]);

    useEffect(() => {
        // API call to fetch the salary for a specific user
        fetch(`http://localhost:6060/attend/get/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }
                return response.json();
            })
            .then(data => {
                setAttendData(data);
                console.log(data);


            })
            .catch(error => {
                console.log(error);

            });
    }, [userId]);

    return (
        <div className='hr'>
            <div className="container-fluid pt-5 pb-5">
                <div className="container pt-5 pb-5">
                    {/* <div className="d-flex justify-content-center pb-2"><span className="h-txt fs-1 fw-bold">HR</span></div> */}

                    <div className="row pt-2 g-5 row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 justify-content-around">
                        <div className="hr-card card  col p-4" style={{ width: 280, height: 400 }}>


                            <img src={salary} className='img-fluid'></img><br></br><br></br>

                            <button className='hr-butn border-0 mt-4 fw-bolder p-1 fs-5 text-white bg-none' onClick={handleShow}>
                                Salary
                            </button>

                            <Modal show={show} onHide={handleShow} size='sm' >

                                <Modal.Header>
                                    <Modal.Title className='fw-bold'>Salary Slip</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    {salaryData.length > 0 ? (
                                        salaryData.map(salary => (
                                            <div key={salary.salaryid}>
                                                <label>Basic Salary: {salary.basic_salary}</label><br />
                                                <label>Travel Allowance: {salary.ta}</label><br />
                                                <label>Food Allowance: {salary.fa}</label><br />
                                                <label>PF: {salary.pf}</label><br />
                                                <label>ESI: {salary.esi}</label><br /><hr />
                                                <label>Overall Salary: {salary.overall_salary}</label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No salary data available.</p>
                                    )}
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>

                            </Modal>

                        </div>
                        <div className="card hr-card  col p-4" style={{ width: 280, height: 400 }}>
                            <img src={mark} className='img-fluid'></img><br></br>
                            <button className='hr-butn border-0 bg-none mt-5  p-1 fs-5 fw-bolder text-white' onClick={handleShow1}>
                                Attendance
                            </button>

                            <Modal onHide={handleShow1} show={show1} size='sm'>
                                <Modal.Header>
                                    <Modal.Title className='fw-bold'>
                                        Attendance Details
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    {AttendData.map(attend => (
                                        <div key={attend.attendid}>
                                            <label>No.of Working days:{attend.workingdays}<span></span></label><br></br>
                                            <label>No.of Holidays:{attend.holidays}<span></span></label><br></br>
                                            <label>No.of Present:{attend.present}<span></span></label><br></br>
                                            <label>No.of CL/SL:{attend.cl_sl}<span></span></label><br></br>
                                            <label>No.of LOPs:{attend.lop}<span></span></label><br></br>
                                        </div>
                                    ))}

                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose1}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                      
                    </div>
                </div>
            </div>

        </div>

    )
}
export default HR;