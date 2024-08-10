import{ useState } from 'react'
import Swal from 'sweetalert2';

const VaccantDetails = () =>{

  const [career] = [
    {
      img: "../src/assets/Career.jpg",
    }
  ]

  
  const [job, setJobData] = useState({
    manager: '',
    team_lead: '',
    senior_developer: '',
    junior_developer: '',
    frontend_developer: '',
    backend_developer: '',
    training_tutors: ''
  });

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setJobData({ ...job, [name]: value });
  };

  const jobSubmit = (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const jobData = {
      manager: job.manager,
      team_lead: job.team_lead,
      senior_developer: job.senior_developer,
      junior_developer: job.junior_developer,
      frontend_developer: job.frontend_developer,
      backend_developer: job.backend_developer,
      training_tutors: job.training_tutors
    };

    fetch("http://localhost:6060/job/set", {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Swal.fire({
          title: 'Jobs Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'small-swal-popup'
          }
        });

        // Reset form after successful submission
        setJobData({
          manager: '',
          team_lead: '',
          senior_developer: '',
          junior_developer: '',
          frontend_developer: '',
          backend_developer: '',
          training_tutors: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add job data.',
          icon: 'error',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'small-swal-popup'
          }
        });
      });

    console.log(jobData);
  };

  const validateFields = () => {
    // Perform validation logic here if needed
    // Example: check if fields are not empty
    for (let key in job) {
      if (job[key].trim() === '') {
        Swal.fire({
          title: 'Validation Error',
          text: 'Please fill in all fields.',
          icon: 'error',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'small-swal-popup'
          }
        });
        return false;
      }
    }
    return true;
  };

  return (
    <div className="container-fluid pt-5 pb-5">
      <div className="container">
      <div className="row">
        <div className="col-md-6 pt-5" style={{zIndex:-1}} >
          <img src={career.img} className='img-fluid' alt="" />
        </div>
      <div className="col-md-6 text-center pt-3" style={{lineHeight:1.5}}>
        <label className="fs-2 fw-bolder">Job Openings</label><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Managers' name="manager" value={job.manager} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Team Lead' name="team_lead" value={job.team_lead} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Senior Developers' name="senior_developer" value={job.senior_developer} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Junior Developers' name="junior_developer" value={job.junior_developer} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Frontend Developers' name="frontend_developer" value={job.frontend_developer} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Backend Developers' name="backend_developer" value={job.backend_developer} onChange={handleChange1} /><br /><br />
        <input style={{width:300}} type="text" placeholder='No.of Training Tutors' name="training_tutors" value={job.training_tutors} onChange={handleChange1} /><br></br><br></br>
        <button style={{width:300}} className="job-butn fw-bolder p-1 text-white border-0" onClick={jobSubmit}>Submit</button>
      </div>
     
    </div>
      </div>
    </div>
    
  );
};

export default VaccantDetails;
