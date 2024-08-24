import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProfilePage from '../src/ProfilePage'
import LandIcons from '../src/LandIcons'

import '../src/index.css'
import Swal from 'sweetalert2';

import NavDropdown from 'react-bootstrap/NavDropdown';

const Landpage = () => {


  const [checkIn, setCheckindate] = useState(null);
  const [checkOut, setCheckoutdate] = useState(null);
  const userId = localStorage.getItem("id");

  const checkIndate = () => {
    var showdate = new Date();
    var checkInTime = showdate.getHours() + ':' + showdate.getMinutes() + ':' + showdate.getSeconds();
    setCheckindate(checkInTime);
  
    fetch(`http://localhost:6060/punch/checkin/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkIn: checkInTime }),
    })
      .then(response => {
        if (response.status === 400) {
          // If the response is a 400 Bad Request, it means the user has already checked in.
          Swal.fire({
            icon: 'warning',
            title: 'Already Checked In',
            text: 'You have already checked in today. You cannot check in again.',
          });
          return null; // Stop further processing
        } else if (!response.ok) {
          // If there is any other error, throw an error to be caught by the catch block
          throw new Error('Check-in failed');
        }
        return response.json(); // If successful, process the response
      })
      .then(data => {
        if (data) {
          // Show success alert only if check-in is successful
          console.log('Check-in successful:', data);
          Swal.fire({
            icon: 'success',
            title: 'Check-in successful',
            text: 'You have successfully checked in.',
          });
        }
      })
      .catch((error) => {
        // Handle any other errors
        Swal.fire({
          icon: 'error',
          title: 'Check-in failed',
          text: 'There was an error checking in. Please try again.',
        });
        console.error('Error:', error);
      });
  };
  

 const checkOutdate = () => {
  var showdate = new Date();
  var checkOutTime = showdate.getHours() + ':' + showdate.getMinutes() + ':' + showdate.getSeconds();
  setCheckoutdate(checkOutTime);

  fetch(`http://localhost:6060/punch/checkout/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkOut: checkOutTime }),
  })
    .then(response => {
      if (response.status === 404) {
        // Handle the case where the check-in record is not found
        Swal.fire({
          icon: 'error',
          title: 'Check-out Error',
          text: 'No check-in record found for check-out. Please check in first.',
        });
        return null; // Stop further processing
      } else if (response.status === 400) {
        // Handle the case where the user has already checked out
        Swal.fire({
          icon: 'warning',
          title: 'Already Checked Out',
          text: 'You have already checked out today. You cannot check out again.',
        });
        return null;
      } else if (!response.ok) {
        // Handle any other errors
        throw new Error('Check-out failed');
      }
      return response.json(); // If successful, process the response
    })
    .then(data => {
      if (data) {
        // Show success alert if check-out is successful
        Swal.fire({
          icon: 'success',
          title: 'Check-out successful',
          text: 'You have successfully checked out.',
        });
        console.log('Check-out successful:', data);
      }
    })
    .catch((error) => {
      // Handle any other errors
      Swal.fire({
        icon: 'error',
        title: 'Check-out failed',
        text: 'There was an error checking out. Please try again.',
      });
      console.error('Error:', error);
    });
};


  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      const name = localStorage.getItem("name") || 'Guest';
      Swal.fire({
        title: `Welcome ${name}`,
        position: 'top',
        timer: 3000, // The popup will close automatically after 3000 milliseconds (3 seconds)
        showConfirmButton: false,

      });
      // Clear the login status in local storage after showing the alert
      localStorage.removeItem("isLoggedIn");
    }
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="">

      <Navbar expand="lg" className="navbr position-sticky top-0 z-2">
        <Container>
          <Navbar.Brand className="nv-txt fs-3 fw-bold">E-connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center flex-grow-1">
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#hr">HR</Nav.Link>
              <Nav.Link href="#request">Requests</Nav.Link>
              <Nav.Link href="#punch">Punchlist</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={checkIndate}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-left text-success" viewBox="0 0 16 16">
                  <path fill="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" />
                  <path fill="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                </svg> &nbsp; Check-In </NavDropdown.Item>
                <NavDropdown.Item onClick={checkOutdate}>
                  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; Check-Out &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-in-right text-danger" viewBox="0 0 16 16">
                    <path fill="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                    <path fill="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                  </svg>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className="" href="land"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule='evenodd' d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg></Nav.Link>
              <Nav.Link classNameName="" href="not"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
              </svg></Nav.Link>

              <Nav.Link className="" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-escape" viewBox="0 0 16 16">
                  <path d="M8.538 1.02a.5.5 0 1 0-.076.998 6 6 0 1 1-6.445 6.444.5.5 0 0 0-.997.076A7 7 0 1 0 8.538 1.02" />
                  <path d="M7.096 7.828a.5.5 0 0 0 .707-.707L2.707 2.025h2.768a.5.5 0 1 0 0-1H1.5a.5.5 0 0 0-.5.5V5.5a.5.5 0 0 0 1 0V2.732z" />
                </svg>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container-fluid pt-1 pb-2">
        <ProfilePage />
      </div>
      <div className="container-fluid pt-2 pb-2">
        <LandIcons />
      </div>
    </div>
  );
}




export default Landpage;