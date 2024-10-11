import React from 'react'
import { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Jobpost = () => {

    const [selectedDate, setSelectedDate] = useState(null);

    const [career] = [
      {
        img: "../src/assets/Career.jpg",
      },
    ];
  
    const jobRoles = [
      'Software Developer',
      'Fullstack Developer',
      'UI/UX Designer',
      'Applications Developer',
      'Software Engineer',
      'Team Lead',
      'IT Support',
      'Admin',
      'Front end Developer',
      'Backend Developer',
      'Java Developer',
      'Python Developer',
      'PHP/Laravel Developer',
      'Flutter Developer',
      'Data Analyst',
      'Data Engineer',
      'Android Developer',
      'iOS Developer',
    ];
  
    const locations = [
      'Kalavaasal, Madurai. Tamil Nadu',
      'Thallakulam, Madurai. Tamil Nadu',
      'AnnaNagar, Madurai. Tamil Nadu',
      'Malaikottai, Trichy. Tamil Nadu',
      'Old BusStand, Salem. Tamil Nadu',
      'Tambaram, Chennai. Tamil Nadu',
      'Old PerumalKovil.opp, Coimbatore, Tamil Nadu',
      'Near Egmore Railway station, Chennai. Tamil Nadu',
      'New bus stand, Tiruppur. Tamil Nadu',
      'Fort-Kochi, Kochi. Kerala',
      'Chaaka, Thiruvanthapuram. Kerala',
    ];
  
    const [job, setJobData] = useState({
      jobtitle: '',
      jobdescription: '',
      location: '',
      experience: '',
      openings:'',
      expirydate: '',
    });
  
    const handleChange1 = (event) => {
      const { name, value } = event.target;
      setJobData({ ...job, [name]: value });
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setJobData({ ...job, expirydate: date }); // Update expirydate in job state
    };
  
    const jobSubmit = (event) => {
      event.preventDefault();
  
      if (!validateFields()) {
        return;
      }
  
      const jobData = {
        jobtitle: job.jobtitle,
        jobdescription: job.jobdescription,
        location: job.location,
        experience: job.experience,
        openings:job.openings,
        expirydate: job.expirydate ? job.expirydate.toISOString().split('T')[0] : '' // Convert to string if not null
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
              popup: 'small-swal-popup',
            },
          });
  
          // Reset form after successful submission
          setJobData({
            jobtitle: '',
            jobdescription: '',
            location: '',
            experience: '',
            openings:'',
            expirydate: '',
          });
          setSelectedDate(null); // Reset selected date
        })
        .catch((error) => {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Failed to add job data.',
            icon: 'error',
            confirmButtonText: 'Close',
            customClass: {
              popup: 'small-swal-popup',
            },
          });
        });
  
     
    };
  
    const validateFields = () => {
      for (let key in job) {
          // Check if the value is a string and trim it
          if (typeof job[key] === 'string' && job[key].trim() === '') {
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
          
          // You can also check for other types if needed, for example:
          if (key === 'expirydate' && !job[key]) {
              Swal.fire({
                  title: 'Validation Error',
                  text: 'Please select an expiry date.',
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
   <>
     <div className="container-fluid text-center pt-4">
        <div className="container">
            <p className='fs-2 fw-bolder'>Career Dashboard</p>
          <Nav fill variant="tabs">
            <Nav.Item>
              <Nav.Link href="/career">Job Openings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/career/apply">Applied Jobs</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
      <div className="container-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-6 pt-3" style={{ zIndex: -1 }}>
            <img src={career.img} className='img-fluid' alt="" />
          </div>
          <div className="col-md-6 text-center pt-5" style={{ lineHeight: 1.2 }}>
            <label className="fs-2 fw-bolder">Job Openings</label><br /><br />

            <select
              style={{ width: 300, height: 30 }}
              name="jobtitle" // Set the name to map to jobtitle
              value={job.jobtitle} // Controlled component
              onChange={handleChange1}
            >
              <option value="" disabled>Job Title</option>
              {jobRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select><br /><br />

            <textarea
              style={{ width: 300 }}
              placeholder='Description'
              name="jobdescription"
              value={job.jobdescription}
              onChange={handleChange1}
            ></textarea><br /><br />

            <select
              style={{ width: 300, height: 30 }}
              name="location" // Set the name to map to location
              value={job.location} // Controlled component
              onChange={handleChange1}
            >
              <option value="" disabled>Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select><br /><br />

            <input
              style={{ width: 300 }}
              type="text"
              placeholder='Experience'
              name="experience"
              value={job.experience}
              onChange={handleChange1}
            /><br /><br />

            <input
              style={{ width: 300 }}
              type="text"
              placeholder='Openings'
              name="openings"
              value={job.openings}
              onChange={handleChange1}
            /><br /><br />

            <DatePicker
              className='custom-datepicker'
              id="datePicker"
              selected={selectedDate}
              onChange={handleDateChange} // Set the date
              dateFormat="yyyy-MM-dd"
              placeholderText="Expiry date"
              isClearable
              showYearDropdown
              scrollableYearDropdown
            /><br /><br />

            <button
              style={{ width: 300 }}
              className="job-butn fw-bolder p-1 text-white border-0"
              onClick={jobSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Jobpost