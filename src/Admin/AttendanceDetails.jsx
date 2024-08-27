import { useState } from 'react'
import Swal from 'sweetalert2';

const AttendanceDetails = () => {

  const [attendance] = [
    {
      img: "../src/assets/Attendance.jpg",
    }
  ]

  const [attend, setAttendData] = useState({
    workingdays: '',
    holidays: '',
    present: '',
    cl_sl: '',
    lop: '',
    month_salary: ''
  });

  const handletabChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setAttendData({ ...attend, [name]: value });
  };

  const validateFields = () => {
    const requiredFields = [
      'workingdays', 'holidays', 'present', 'cl_sl', 'lop', 'month_salary'
    ];

    for (let field of requiredFields) {
      if (!attend[field]) {
        Swal.fire({
          title: 'Error',
          text: `${field.replace('_', ' ')} is required.`,
          icon: 'error',
          confirmButtonText: 'Close'
        });
        return false;
      }
    }
    return true;
  };

  const sub = () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'User ID not found in local storage.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
      return;
    }

    if (!validateFields()) {
      return;
    }

    const attendData = {
      workingdays: attend.workingdays,
      holidays: attend.holidays,
      present: attend.present,
      cl_sl: attend.cl_sl,
      lop: attend.lop,
      month_salary: attend.month_salary,
    };

    fetch(`http://localhost:6060/attend/set/${userId}`, {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Swal.fire({
          title: 'Attendance Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close'
        });

        // Reset form fields after successful submission
        setAttendData({
          workingdays: '',
          holidays: '',
          present: '',
          cl_sl: '',
          lop: '',
          month_salary: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add attendance data.',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      });
  };

  return (
    <div className='container-fluid pt-5 pb-5'>
      <div className="container">
        <div className="row row-cols-lg-2 row-cols-1">
          <div className="col">
            <img className='img-fluid'  src={attendance.img} alt="" />
          </div>
          <div className="col text-center pt-5" >
            <label className="fw-bolder fs-2">Attendance Details</label><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="No.of. Working Days" name="workingdays" value={attend.workingdays} onChange={handletabChange}></input><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="No.of. Present" name="holidays" value={attend.holidays} onChange={handletabChange}></input><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="No.of. Holidays" name="present" value={attend.present} onChange={handletabChange}></input><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="No.of. CL/SL" name="cl_sl" value={attend.cl_sl} onChange={handletabChange}></input><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="No.of. LOP's" name="lop" value={attend.lop} onChange={handletabChange}></input><br></br><br></br>
            <input style={{width:300}} type="text" placeholder="Overall Salary" name="month_salary" value={attend.month_salary} onChange={handletabChange}></input><br></br><br></br>
            <button style={{width:300}} className='atnd-butn fw-bolder text-white border-0 p-1 ps-5 pe-5' onClick={sub}>Submit</button>

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AttendanceDetails;
