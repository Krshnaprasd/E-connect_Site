import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Request = () =>{
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setShow3(false);
  const handleClose4 = () => setShow4(false);
  const handleClose5 = () => setShow5(false);
  const handleClose6 = () => setShow6(false);
  const handleClose7 = () => setShow7(false);

  const handleShow = () => setShow(true);
  const handleShow1 = () => setShow1(true);
  const handleShow2 = () => setShow2(true);
  const handleShow3= () => setShow3(true);
  const handleShow4= () => setShow4(true);
  const handleShow5= () => setShow5(true);
  const handleShow6= () => setShow6(true);
  const handleShow7= () => setShow7(true);


  const sub = () =>{
    alert("Request sent")
  }
return(
    <>
    <div class="container-fluid project pt-5 pb-5">
    <div class="container">
        <div class="d-flex justify-content-center pb-4"><span class="fs-1 fw-bold">MY REQUEST</span></div>
        <div class="row pb-4 row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 justify-content-around">
        <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center text-white-50 pb-3"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
                </svg></div>
                <button className='border-0 bar p-1 fs-5 text-white bg-none' onClick={handleShow}>
                    Leave
                </button>
                <Modal show={show} onHide={handleShow} size='sm'>
                    <Modal.Header>
                    <Modal.Title className='fw-bold'>Leave Request</Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center pb-3 text-white-50"> <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-house-check" viewBox="0 0 16 16">
                <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207l-5 5V13.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 2 13.5V8.207l-.646.647a.5.5 0 1 1-.708-.708z"/>
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.707l.547.547 1.17-1.951a.5.5 0 1 1 .858.514"/>
                </svg></div>
               <button className='border-0 bg-none bar p-1 fs-5 text-white' onClick={handleShow1}>
                OnDuty/WFH
               </button>
                <Modal onHide={handleShow1} show={show1} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            OnDuty/WFH Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose1}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row pb-3 text-white-50"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-fingerprint" viewBox="0 0 16 16">
                <path d="M8.06 6.5a.5.5 0 0 1 .5.5v.776a11.5 11.5 0 0 1-.552 3.519l-1.331 4.14a.5.5 0 0 1-.952-.305l1.33-4.141a10.5 10.5 0 0 0 .504-3.213V7a.5.5 0 0 1 .5-.5Z"/>
                <path d="M6.06 7a2 2 0 1 1 4 0 .5.5 0 1 1-1 0 1 1 0 1 0-2 0v.332q0 .613-.066 1.221A.5.5 0 0 1 6 8.447q.06-.555.06-1.115zm3.509 1a.5.5 0 0 1 .487.513 11.5 11.5 0 0 1-.587 3.339l-1.266 3.8a.5.5 0 0 1-.949-.317l1.267-3.8a10.5 10.5 0 0 0 .535-3.048A.5.5 0 0 1 9.569 8m-3.356 2.115a.5.5 0 0 1 .33.626L5.24 14.939a.5.5 0 1 1-.955-.296l1.303-4.199a.5.5 0 0 1 .625-.329"/>
                <path d="M4.759 5.833A3.501 3.501 0 0 1 11.559 7a.5.5 0 0 1-1 0 2.5 2.5 0 0 0-4.857-.833.5.5 0 1 1-.943-.334m.3 1.67a.5.5 0 0 1 .449.546 10.7 10.7 0 0 1-.4 2.031l-1.222 4.072a.5.5 0 1 1-.958-.287L4.15 9.793a9.7 9.7 0 0 0 .363-1.842.5.5 0 0 1 .546-.449Zm6 .647a.5.5 0 0 1 .5.5c0 1.28-.213 2.552-.632 3.762l-1.09 3.145a.5.5 0 0 1-.944-.327l1.089-3.145c.382-1.105.578-2.266.578-3.435a.5.5 0 0 1 .5-.5Z"/>
                <path d="M3.902 4.222a5 5 0 0 1 5.202-2.113.5.5 0 0 1-.208.979 4 4 0 0 0-4.163 1.69.5.5 0 0 1-.831-.556m6.72-.955a.5.5 0 0 1 .705-.052A4.99 4.99 0 0 1 13.059 7v1.5a.5.5 0 1 1-1 0V7a3.99 3.99 0 0 0-1.386-3.028.5.5 0 0 1-.051-.705M3.68 5.842a.5.5 0 0 1 .422.568q-.044.289-.044.59c0 .71-.1 1.417-.298 2.1l-1.14 3.923a.5.5 0 1 1-.96-.279L2.8 8.821A6.5 6.5 0 0 0 3.058 7q0-.375.054-.736a.5.5 0 0 1 .568-.422m8.882 3.66a.5.5 0 0 1 .456.54c-.084 1-.298 1.986-.64 2.934l-.744 2.068a.5.5 0 0 1-.941-.338l.745-2.07a10.5 10.5 0 0 0 .584-2.678.5.5 0 0 1 .54-.456"/>
                <path d="M4.81 1.37A6.5 6.5 0 0 1 14.56 7a.5.5 0 1 1-1 0 5.5 5.5 0 0 0-8.25-4.765.5.5 0 0 1-.5-.865m-.89 1.257a.5.5 0 0 1 .04.706A5.48 5.48 0 0 0 2.56 7a.5.5 0 0 1-1 0c0-1.664.626-3.184 1.655-4.333a.5.5 0 0 1 .706-.04ZM1.915 8.02a.5.5 0 0 1 .346.616l-.779 2.767a.5.5 0 1 1-.962-.27l.778-2.767a.5.5 0 0 1 .617-.346m12.15.481a.5.5 0 0 1 .49.51c-.03 1.499-.161 3.025-.727 4.533l-.07.187a.5.5 0 0 1-.936-.351l.07-.187c.506-1.35.634-2.74.663-4.202a.5.5 0 0 1 .51-.49"/>
                </svg></div>
                <button className='border-0 bg-none text-white bar p-1 fs-5' onClick={handleShow2}>
                    Forgot Punch
                </button>
                <Modal onHide={handleShow2} show={show2} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Forgot Punch Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose2}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center text-white-50 pb-3"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
            </svg></div>
                <button className='border-0 bg-none bar p-1 fs-5 text-white' onClick={handleShow3}>
                Permission
                </button>
                <Modal onHide={handleShow3} show={show3} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Permission  Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose3}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
            <div class="row row-cols-lg-5 row-cols-md-2 row-cols-sm-2 row-cols-1 justify-content-around">
            <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center text-white-50 pb-3"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
                <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
                <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
                </svg></div>
                <button className='border-0 bar p-1 fs-5 text-white bg-none' onClick={handleShow4}>
                    Overtime
                </button>
                <Modal onHide={handleShow4} show={show4} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Overtime Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                        <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose4}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row pb-3 text-white-50"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-bag-check-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
            </svg></div>
                <button className='border-0 bg-none text-white bar p-1 fs-5' onClick={handleShow5}>
                    Travel
                </button>
                <Modal onHide={handleShow5} show={show5} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Travel Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>From:</label>
                            <input type="text"></input>
                            <label>To:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose5}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center pb-3 text-white-50">  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                </svg></div>
               <button className='border-0 bg-none bar p-1 fs-5 text-white' onClick={handleShow6}>
               Advance
               </button>
               <Modal onHide={handleShow6} show={show6} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Salary Advance Request
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>Range:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose6}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                
            </div>
            <div class="card bar col mb-2 p-4">
            <div class="row justify-content-center text-white-50 pb-3"><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-credit-card-2-front" viewBox="0 0 16 16">
        <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
        <path d="M2 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
        </svg></div>
                <button className='border-0 bg-none bar p-1 fs-5 text-white' onClick={handleShow7}>
                    Resignation
                </button>
                <Modal onHide={handleShow7} show={show7} size='sm'>
                    <Modal.Header>
                        <Modal.Title className='fw-bold'>
                            Resignation Letter
                        </Modal.Title>
                    </Modal.Header>
                    <div className='d-grid justify-content-center'>
                    <Modal.Body className='d-grid justify-center' style={{width:'18em'}}>
                            <label>Letter of Intent:</label>
                            <input type="text"></input>
                            <label>Reason:</label>
                            <textarea placeholder='Message'></textarea>
                    </Modal.Body></div>
                    <Modal.Footer>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={sub}>
                        Submit
                    </Button>
                    <Button className='bg-primary p-2 rounded-2 border-0 text-white' onClick={handleClose7}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            </div>
            </div>
        </div>
    </>
)    
}
export default Request;