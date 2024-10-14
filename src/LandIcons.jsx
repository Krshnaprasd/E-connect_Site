import React from 'react'
import { useState, useEffect } from 'react';

import { Card, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from 'axios'

const LandIcons = () => {


   const [jobs, setJobs] = useState([]);
   const [totalJobs, setTotalJobs] = useState(0);
   const [page, setPage] = useState(1); 
   const [count, setCount] = useState(6); 
   const [keyword, setKeyword] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const [totalSearchCount, setTotalSearchCount] = useState(0);

   const fetchJobs = async () => {
      try {
         const response = await axios.get(`http://localhost:6060/job/get/${page - 1}/${count}`); 
         setJobs(response.data);
         fetchJobCount(); 
      } catch (error) {
         console.error('Error fetching jobs:', error);
      }
   };

   // Fetch total job count
   const fetchJobCount = async () => {
      try {
         const response = await axios.get('http://localhost:6060/job/get/count');
         setTotalJobs(response.data);
      } catch (error) {
         console.error('Error fetching job count:', error);
      }
   };

   // Search jobs by keyword
   const searchJobs = async () => {
      try {
         const response = await axios.post(`http://localhost:6060/job/search/${page - 1}/${count}/${keyword}`); 
         setSearchResults(response.data);
         fetchSearchCount(); 
      } catch (error) {
         console.error('Error searching jobs:', error);
      }
   };

   // Fetch search count for pagination
   const fetchSearchCount = async () => {
      try {
         const response = await axios.post(`http://localhost:6060/job/search/count/${keyword}`);
         setTotalSearchCount(response.data);
      } catch (error) {
         console.error('Error fetching search count:', error);
      }
   };

   // Fetch jobs on initial load and when page changes
   useEffect(() => {
      if (keyword) {
         searchJobs(); 
      } else {
         fetchJobs();
      }
   }, [page, keyword]);

   // Handle search action
   const handleSearch = async (e) => {
      e.preventDefault();
      setPage(1); 
      await searchJobs();
      await fetchSearchCount();
   };

   // Handle page change
   const handlePageChange = (pageNumber) => {
      setPage(pageNumber);
   };

   const jobList = keyword ? searchResults : jobs; 

   const [user] = [
      {
         img: "../src/assets/About.avif",
         img1: "../src/assets/Profile.avif",
         img2: "../src/assets/HR.avif",
         img3: "../src/assets/Request.jpg",
         img4: "../src/assets/Punchlist.avif",
         img5: "../src/assets/recruit.avif"
      }
   ]



   return (
      <>
         <div className="container-fluid">
            <div className="container">
               <div className="row justify-content-center" id='about'>

                  <div className="row g-0 justify-content-evenly">
                     <div className="col-md-6 align-content-center order-2 order-md-1">
                        <div className="card border-0 p-2 m-2">
                           <button className="e-txt border-0 fs-2 fw-semibold">
                              E-learn
                           </button><br></br>
                           <p style={{ textAlign: 'justify' }}>
                              We are creating the next generation! What we coach, Is our foundation of mentee! We are excited to innovate the best methods of solving problems for every individual student so that will be easy to develop their knowledge and skill.
                           </p>
                           <div className='text-start text-xs-center'><a href="/elearn">Read more</a></div>
                        </div>
                     </div>
                     <div className="col-md-6 text-end order-md-2 order-1">
                        <img src={user.img} className="img-fluid" alt="Img "></img>
                     </div>

                  </div>  </div>
               <div className="row  justify-content-center" id='profile'>
                  <div className="col-md-6 pt-4 pb-4 text-end order-md-1">
                     <img className='img-fluid' src={user.img1}></img>
                  </div>
                  <div className="col-md-6 pt-4 pb-4 align-content-center order-md-2">
                     <div className="card border-0 ">
                        <button className="p-txt border-0 fs-2 fw-semibold">
                           Profile Info
                        </button><br></br>
                        <p style={{ textAlign: 'justify' }}>
                           The Profile Panel allows you to effortlessly manage and update your profile with essential information. Enter and review basic details, account information, and personal preferences in one streamlined interface, ensuring your data is always current and accessible.            </p>
                        <div><a className='p-link' href="/prof">Read more</a></div>
                     </div>
                  </div>

               </div>

               <div className="row  justify-content-evenly" id="hr">

                  <div className="col-md-6 pt-5 pb-3 align-content-center order-md-1 order-2">
                     <div className="card border-0 ">
                        <button className="h-txt border-0 fs-2 fw-semibold">
                           HR
                        </button><br></br>
                        <p style={{ textAlign: 'justify' }}>
                           Our HR Panel offers a comprehensive solution for managing your workforce efficiently. Seamlessly track salaries, monitor attendance, and stay updated on job openings, all from one intuitive platform. Enhance your HR operations with real-time insights and streamline your processes effortlessly.            </p>
                        <div><a className='h-link' href="/hr">Read more</a></div>
                     </div>
                  </div>
                  <div className="col-md-6 pt-5 pb-3 order-md-2 order-1">
                     <img className='img-fluid' src={user.img2}></img>
                  </div>
               </div>
          

               <div className="container-fluid pt-5 text-center" style={{
                  backgroundImage: 'url("../src/assets/edbg.jpeg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  // optional, to control the height of the container
               }}>
                  <div className="container pt-5 pb-5" id='career'>
                     <div className="row">
                        <div className=" mainhd text-center fw-bolder">
                           <div className="d-md-block d-none" style={{ lineHeight: 1.3 }}><span className="txt">Boost&nbsp;</span>🚀<span>Your </span><span className="txt">Career </span><span style={{ wordWrap: 'break-word' }}>Where <br></br> <span style={{ wordWrap: 'break-word' }}>Dreams Meets</span> </span> <span className="txt">Jobs</span>💼</div>
                           <div className="d-block d-md-none" style={{}}><span className="txt">Boost&nbsp;</span>🚀<span>Your </span><span className="txt">Career </span><span style={{ wordWrap: 'break-word' }}>Where <br></br> <span style={{ wordWrap: 'break-word' }}>Dreams Meets</span> </span> <span className="txt">Jobs</span>💼</div>

                        </div>
                        <div className=" pt-md-4 pt-3 text-justify">
                           <p className="tex text-center">Discover limitless career opportunities at our job applying site,where<br></br>
                              ambition meets opportunity. Elevate your professional journey with ease.</p>
                        </div>
                        <div>
                           <Card style={{ maxWidth: '600px', margin: 'auto' }}>
                              <InputGroup>
                                 <FormControl
                                    placeholder="Search jobs"
                                    aria-label="Search"
                                    aria-describedby="search-icon"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                 />
                                 <Button className="search" id="search-icon" onClick={handleSearch}>
                                    <FaSearch />
                                 </Button>
                              </InputGroup>
                           </Card>

                           <div>
                              <h1 className='fw-bolder  pt-5'> Recent Jobs</h1>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="container-fluid text-center">
                  <div className="container">


                     <div className="row row-cols-md-2 row-cols-1 justify-content-around">
                        {Array.isArray(jobList) && jobList.length > 0 ? (
                           jobList.map((job) => (
                              <div className="col mb-3" key={job.jobid}>
                                 <Card style={{ width: '100%' }}>
                                    <Card.Body>
                                       <div>
                                          <Card.Title className='fw-bolder' style={{ fontSize: '16px', textAlign: 'start' }}>
                                             {job.jobtitle}
                                          </Card.Title>
                                          <Card.Text style={{ fontSize: '14px' }}>
                                             <div className="row">
                                                <div className="col-9 d-sm-block d-none" style={{ textAlign: 'start' }}>
                                               
                                                   <strong>Created At:</strong> {new Date(job.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="col-8 d-block d-sm-none" style={{ textAlign: 'start' }}>
                                               
                                               <small>Created At:</small> {new Date(job.createdAt).toLocaleDateString()}
                                            </div>
                                                <div className="col-3">
                                                   <Link to={`/job/${job.jobid}`}>
                                                    
                                                      <button style={{ fontSize: '10px',width:60 }} className='border-0 p-1 ' size="sm">
                                                         View Job
                                                      </button>
                                                   </Link>
                                                </div>
                                             </div>
                                             
                                          </Card.Text>
                                       </div>
                                    </Card.Body>
                                 </Card>
                              </div>
                           ))
                        ) : (
                           <p>No jobs found</p>
                        )}
                     </div>
                     <div className='pt-3 d-flex justify-content-center'>
                        <Pagination>
                           <Pagination.First onClick={() => handlePageChange(1)} />
                           <Pagination.Prev onClick={() => handlePageChange(page > 1 ? page - 1 : 1)} />
                           {Array.from({ length: Math.ceil((keyword ? totalSearchCount : totalJobs) / count) }).map((_, idx) => (
                              <Pagination.Item key={idx + 1} active={page === idx + 1} onClick={() => handlePageChange(idx + 1)}>
                                 {idx + 1}
                              </Pagination.Item>
                           ))}
                           <Pagination.Next onClick={() => handlePageChange(page < Math.ceil((keyword ? totalSearchCount : totalJobs) / count) ? page + 1 : page)} />
                           <Pagination.Last onClick={() => handlePageChange(Math.ceil((keyword ? totalSearchCount : totalJobs) / count))} />
                        </Pagination>
                     </div>
                  </div>

               </div>



               <div className="row pt-3 pb-3 justify-content-center" id='request'>

                  <div className="col-md-6 align-content-center order-md-1 order-2">
                     <div className="card border-0 ">
                        <button className="r-txt border-0 fs-2 fw-semibold">
                           Requests
                        </button><br></br>
                        <p style={{ textAlign: 'justify' }}>
                           The Request Panel empowers you to manage your requests with ease. Submit leave applications, seek permission, or request salary advances through a user-friendly interface, ensuring all your needs are addressed swiftly and efficiently.
                        </p>
                        <div><a href="/req">Read more</a></div>
                     </div>
                  </div>
                  <div className="col-md-6 text-end order-md-2 order-1">
                     <img className='img-fluid' src={user.img3}></img>
                  </div>

               </div>
               <div className="row  justify-content-center" id='punch'>
                  <div className="col-md-6 pt-4 pb-3 text-end order-1">
                     <img className='img-fluid' src={user.img4}></img>
                  </div>
                  <div className="col-md-6 pt-4 pb-3 align-content-center order-2">
                     <div className="card border-0 ">
                        <button className="pu-txt border-0 fs-2 fw-semibold">
                           Punchlists
                        </button><br></br>
                        <p style={{ textAlign: 'justify' }}>

                           The Punchlist Panel provides precise tracking of check-ins and check-outs, capturing day, time, and date details. Effortlessly monitor attendance and ensure accurate records with this intuitive feature.</p>            <div><a className='p-link' href="/punch">Read more</a></div>
                     </div>
                  </div>

               </div>



            </div>
         </div>


      </>


   )
}

export default LandIcons;