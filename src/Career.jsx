


import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom"; // To get the job ID from the URL

const Career = () => {
    const { jobid } = useParams(); // Get job ID from URL
    const [job, setJob] = useState(null);

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
                           <div className="col-4">
                           <strong>Experience:</strong>  {job.experience} years <br></br>
                           <strong>Openings:</strong>   {job.openings} Nos
                           </div>
                           <div className="col-7">
                           <strong>Location:</strong>  {job.location}  <br></br>
                           <strong>Expiry Date:</strong>   {job.expirydate}
                           </div>
                           <div className="col-1">
                           <button className="apply-btn">Apply</button>
                           </div>
                       </div>

                       <div className="pt-5">
                           <p className="fs-5 fw-bolder">Job Description:  </p><br></br>

                       </div>

                       <div style={{textAlign:"justify"}} dangerouslySetInnerHTML={{ __html: job.jobdescription }} />
                   </Accordion.Body>
               </Accordion.Item>
              
              
           </Accordion>
       </div>
        </div>
        </>
        
    );
};

export default Career;


