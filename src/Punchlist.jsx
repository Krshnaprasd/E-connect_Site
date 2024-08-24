import {useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';


const Punchlist = () =>{

  const [checkInOutDetails, setCheckInOutDetails] = useState([]);
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("name");
  useEffect(() => {
    fetch(`http://localhost:6060/punch/checkinout/${userId}`
    ).then(response => response.json())
        .then(data => {

            console.log(data);
            setCheckInOutDetails(data);

        })

}, [userId]); 

const getDayOfWeek = (date) => {
  const options = { weekday: 'long' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

return(
    <>
    <div className="container-fluid project pt-5 pb-5  ">
    <div className="container pb-5">
        <div className="row text-center">
            <span className="fs-1 fw-bold pb-3">Punchlist</span>
            <Table striped bordered hover>
      <thead>
        <tr className='text-center'>
          <th>Day</th>
          <th>Name</th>
          <th>CheckIn</th>
          <th>CheckOut</th>
        </tr>
      </thead>
      <tbody>
                    {checkInOutDetails.length > 0 ? (
                        checkInOutDetails.map((record) => (
                            <tr key={record.id}>
                                <td className='text-center'>{getDayOfWeek(record.checkIn)}</td>
                                <td className='text-center'>{userName}</td>
                                <td className='text-center'>{new Date(record.checkIn).toLocaleString()}</td>
                                <td className='text-center'>
                                    {record.checkOut ? new Date(record.checkOut).toLocaleString() : 'Not checked out'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center'>No check-in/check-out records found</td>
                        </tr>
                    )}
                </tbody>
    </Table>
        </div>
    </div>
    </div>  
    </>
)    
}
export default Punchlist;