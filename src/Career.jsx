

import { useState, useEffect } from "react";
import { Accordion, Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const Career = () => {
    const { jobid } = useParams();
  
    const [job, setJob] = useState(null);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

      const [apply, setApplyjob] = useState({

        email: '',
        phoneno: '',
        resume: '',
        expectedctc: '',
        currentctc: '',
        preferredlocation: ''

    })


    useEffect(() => {
        fetch(`http://localhost:6060/job/${jobid}`) // Fetch the specific job by its ID
            .then((res) => res.json())
            .then((data) => {
                setJob(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [jobid]);

    if (!job) {
        return <div>Loading...</div>;
    }

  

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setApplyjob({ ...apply, resume: file });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setApplyjob({ ...apply, [name]: value })
        console.log(name, value);


    }

   

    const handleSubmit = async () => {
        const userId = localStorage.getItem('id');

     
        const formData = new FormData();
        formData.append("email", apply.email);
        formData.append("phoneno", apply.phoneno);
        formData.append("resume", apply.resume); 
        formData.append("expectedctc", apply.expectedctc);
        formData.append("currentctc", apply.currentctc);
        formData.append("preferredlocation", apply.preferredlocation);
        formData.append("jobId", job.jobid);

        try {
            const res = await fetch(`http://localhost:6060/user/job/apply/${userId}`, {
                method: "POST",
                body: formData,
            });

            
            if (!res.ok) {
                const errorData = await res.json(); 
                throw new Error(errorData.message || 'Failed to submit application.');
            }

            const data = await res.json(); 
            console.log(data);

            Swal.fire({
                title: 'Application Submitted Successfully',
                icon: 'success',
                confirmButtonText: 'Close'
            });
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message || 'Failed to submit application.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
            console.error(err);
        } finally {
            
            setApplyjob({
                email: '',
                phoneno: '',
                resume: null,
                expectedctc: '',
                currentctc: '',
                preferredlocation: ''
            });
            handleClose3(true); 
        }
    

    }


    //============================================================================




    return (
        <>
            <div className="container-fluid pt-5 pb-5">
                <div className="container">

                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <div className="row ">
                                    <strong >{job.jobtitle}</strong>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>

                                <div className="row">
                                    <div className="col-md-4 col-12">
                                        <strong>Experience:</strong> <small>{job.experience} years</small>  <br></br>
                                        <strong>Openings:</strong>  <small> {job.openings} Nos</small>
                                    </div>
                                    <div className="col-md-6 col-lg-7 col-12">
                                        <strong>Location:</strong> <small>{job.location}</small>   <br></br>
                                        <strong>Expiry Date:</strong> <small>{job.expirydate}</small><br></br><br></br>
                                    </div>

                                    <div className="col-md-1 col-12 text-center">
                                        <button className="apply-btn bg-primary bg-gradient" onClick={handleShow3}>Apply</button>
                                    </div>
                                </div>

                                <div className="pt-5">
                                    <p className="fs-5 fw-bolder">Job Description:  </p><br></br>

                                </div>

                                <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: job.jobdescription }} />
                            </Accordion.Body>
                        </Accordion.Item>


                    </Accordion>


                </div>
            </div>
            <Modal show={show3} onHide={handleShow3} size='md'>
                <Modal.Header className="justify-content-center">
                    <Modal.Title className='fw-bold'>Application Form</Modal.Title>
                </Modal.Header>
                <div className=''>
                    <Modal.Body className=''>
                        <div className="row justify-content-center">
                            <div className="col-5" style={{ lineHeight: 2 }}>
                                <small><label>Username:</label><br /></small>
                                <small><label>Email:</label></small><br />
                                <small><label>Phone:</label><br /></small>
                                <small><label>Select Job:</label></small><br />
                                <small><label>Resume:</label><br /></small>
                                <small><label>Expected CTC:</label><br /></small>
                                <small><label>Current CTC:</label><br /></small>
                                <small><label>Preferred Location:</label><br /></small>
                            </div>
                            <div className="col-6">
                                <input type="text" value={localStorage.getItem('name')} readOnly style={{ marginBottom: 5 }} />
                                <input type="text" name="email" value={apply.email} onChange={handleChange} style={{ marginBottom: 5 }} />
                                <input type="text" name="phoneno" value={apply.phoneno} onChange={handleChange} style={{ marginBottom: 5 }} />
                                <input
                                    type="text"
                                    name="jobName"
                                    value={job?.jobtitle || ''}  // Display the jobName
                                    readOnly  // Make it read-only
                                    style={{ marginBottom: 5 }}
                                />
                                <small><input type="file" name="resume" onChange={handleFileChange} style={{ marginBottom: 5 }} /></small>
                                <input type="text" name="expectedctc" value={apply.expectedctc} onChange={handleChange} style={{ marginBottom: 5 }} />
                                <input type="text" name="currentctc" value={apply.currentctc} onChange={handleChange} style={{ marginBottom: 5 }} />
                                <input type="text" name="preferredlocation" value={apply.preferredlocation} onChange={handleChange} style={{ marginBottom: 5 }} />
                            </div>
                        </div>
                    </Modal.Body>
                </div>
                <Modal.Footer className="justify-content-center">
                    
                    <button className='bg-primary bg-gradient rounded-1  border-0 text-white' style={{ width: 80, height: 25, fontSize: 12 }} onClick={handleSubmit}>
                        Submit
                    </button>
                    <button className='bg-secondary rounded-1  border-0 text-white' style={{ width: 80, height: 25, fontSize: 12 }} onClick={handleClose3}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

        </>

    );
};

export default Career;


