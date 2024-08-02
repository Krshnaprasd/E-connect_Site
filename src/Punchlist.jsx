
import Table from 'react-bootstrap/Table';


const Punchlist = () =>{

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
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
        </div>
    </div>
    </div>  
    </>
)    
}
export default Punchlist;