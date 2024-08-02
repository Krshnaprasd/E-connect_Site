import{ useState } from 'react'
import Swal from 'sweetalert2';


const SalaryDetails = () =>{
  const [ctc, setCtcData] = useState({
    ctc: '',
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
      'ctc', 'basic_salary', 'ta', 'fa', 'pf', 'esi', 'overall_salary'
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
    const userId = localStorage.getItem("userId");
  
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
      ctc: ctc.ctc,
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
          ctc: '',
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
        <div className="container mt-5 text-center d-flex justify-content-center">
          <div className="row mt-3 card mincard" style={{ width: "350px" }}>
            <div className="col pt-5" style={{ lineHeight: "20px" }}>
              <label className="fs-4 fw-bolder text-white">Salary Details</label><br /><br />
              <input type="text" placeholder="Annual Gross Salary" name="ctc" value={ctc.ctc} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="Basic Salary" name="basic_salary" value={ctc.basic_salary} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="Travel Allowance" name="ta" value={ctc.ta} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="Food Allowance" name="fa" value={ctc.fa} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="PF" name="pf" value={ctc.pf} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="ESI" name="esi" value={ctc.esi} onChange={handletabChange}></input><br /><br />
              <input type="text" placeholder="Overall Salary" name="overall_salary" value={ctc.overall_salary} onChange={handletabChange}></input>
            </div>
            <div className='text-center pt-3 pb-5'>
              <button style={{ width: "9em" }} className='butn text-white border-0 pe-3 p-1 ps-3' onClick={sub}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SalaryDetails;