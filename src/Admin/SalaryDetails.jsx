import{ useState } from 'react'
import Swal from 'sweetalert2';


const SalaryDetails = () =>{


  const [salary] = [
    {
      img: "../src/assets/Salary.jpg",
    }
  ]

  const [ctc, setCtcData] = useState({
  
    basic_salary: '',
    ta: '',
    fa: '',
    pf: '',
    esi: '',
    overall_salary: ''
  });
  
  const handletabChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCtcData({ ...ctc, [name]: value });
    console.log(name, value);
  };
  
  const validateFields = () => {
    const requiredFields = [
     'basic_salary', 'ta', 'fa', 'pf', 'esi', 'overall_salary'
    ];
  
    for (let field of requiredFields) {
      if (!ctc[field]) {
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
  
    const ctcData = {
    
      basic_salary: ctc.basic_salary,
      ta: ctc.ta,
      fa: ctc.fa,
      pf: ctc.pf,
      esi: ctc.esi,
      overall_salary: ctc.overall_salary
    };
  
    fetch(`http://localhost:6060/salary/set/${userId}`, {
      method: "post",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ctcData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Swal.fire({
          title: 'Salary Details Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'small-swal-popup'
          }
        });
  
        // Reset form fields after successful submission
        setCtcData({
        
          basic_salary: '',
          ta: '',
          fa: '',
          pf: '',
          esi: '',
          overall_salary: ''
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to add salary data.',
          icon: 'error',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'small-swal-popup'
          }
        });
      });
      
  };
  
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-6 pt-5 mt-md-5 text-center">
              <label className="fs-2 fw-bolder">Salary Details</label><br /><br />
              <input style={{width:300}} type="text" placeholder="Basic Salary" name="basic_salary" value={ctc.basic_salary} onChange={handletabChange}></input><br /><br />
              <input style={{width:300}} type="text" placeholder="Travel Allowance" name="ta" value={ctc.ta} onChange={handletabChange}></input><br /><br />
              <input style={{width:300}} type="text" placeholder="Food Allowance" name="fa" value={ctc.fa} onChange={handletabChange}></input><br /><br />
              <input style={{width:300}} type="text" placeholder="PF" name="pf" value={ctc.pf} onChange={handletabChange}></input><br /><br />
              <input style={{width:300}} type="text" placeholder="ESI" name="esi" value={ctc.esi} onChange={handletabChange}></input><br /><br />
              <input style={{width:300}} type="text" placeholder="Overall Salary" name="overall_salary" value={ctc.overall_salary} onChange={handletabChange}></input><br></br><br></br>
              <button style={{width:300}} className='ctc-butn fw-bolder text-white border-0 pe-3 p-1 ps-3' onClick={sub}>Submit</button>
            </div>
            <div className="col-md-6 pt-4">
              <img src={salary.img} className='img-fluid' alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalaryDetails;