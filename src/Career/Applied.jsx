import React, { useEffect, useState } from 'react';
import { Document, Page } from "@react-pdf/renderer";


import { FaSearch } from 'react-icons/fa';
import { Card, InputGroup, FormControl, Button, Pagination, Accordion, } from 'react-bootstrap';

import Swal from 'sweetalert2';
import axios from 'axios'

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Applied = ({ applyid }) => {

    const [apply, setApplyJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(5);
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [totalSearchCount, setTotalSearchCount] = useState(0);


    //======================================================================

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:6060/user/job/get/${page - 1}/${count}`);
            setApplyJobs(response.data);
            fetchJobCount();
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const searchJobs = async () => {
        try {
            const response = await axios.post(`http://localhost:6060/user/job/search/${page - 1}/${count}/${keyword}`);
            setSearchResults(response.data);
            fetchSearchCount();
        } catch (error) {
            console.error('Error searching jobs:', error);
        }
    };

    const fetchJobCount = async () => {
        try {
            const response = await axios.get('http://localhost:6060/user/job/get/count');
            setTotalJobs(response.data);
        } catch (error) {
            console.error('Error fetching job count:', error);
        }
    };

    const fetchSearchCount = async () => {
        try {
            const response = await axios.post(`http://localhost:6060/user/job/search/count/${keyword}`);
            setTotalSearchCount(response.data);
        } catch (error) {
            console.error('Error fetching search count:', error);
        }
    };

    useEffect(() => {
        if (keyword) {
            searchJobs();
        } else {
            fetchJobs();
        }
    }, [page, keyword]);

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



    const handleSelect = async (applyid) => {
        try {
            const response = await axios.post(`http://localhost:6060/user/job/select/${applyid}`);
            Swal.fire({
                icon: 'success',
                title: 'Selected',
                text: response.data.message,
                confirmButtonText: 'OK',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error selecting the applicant',
                confirmButtonText: 'OK',
            });
            console.error("There was an error selecting the applicant", error);
        }
    };

    const handleReject = async (applyid) => {
        try {
            const response = await axios.post(`http://localhost:6060/user/job/reject/${applyid}`);
            Swal.fire({
                icon: 'success',
                title: 'Rejected',
                text: response.data.message,
                confirmButtonText: 'OK',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'There was an error rejecting the applicant',
                confirmButtonText: 'OK',
            });
            console.error("There was an error rejecting the applicant", error);
        }
    };


    const downloadResume = async (applyid) => {
        try {
            const response = await axios.get(`http://localhost:6060/user/job/resume/download/${applyid}`, {
                responseType: 'blob',  // Specify that the response is a Blob
            });

            // Create a link element, use it to download the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;

            // Assuming the file is a PDF, set the file name
            link.setAttribute('download', `resume_${applyid}.pdf`);

            // Append to the document body and trigger download
            document.body.appendChild(link);
            link.click();


            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading the resume:', error);
        }
    };

    const jobList = keyword ? searchResults : apply;

    return (
        <>
            <div className="container-fluid pt-5">

                <div className="container">
                    <div>
                        <div className="row text-center text-md-start">
                            <div className="col-md-6 col-12">
                                <p className='fs-3 fw-bolder'>Applied Candidates</p>
                            </div>
                            <div className="col-md-6 col-12">
                                <Card style={{ maxWidth: '600px', margin: 'auto' }}>
                                    <InputGroup size='sm'>
                                        <FormControl
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="search-icon"
                                            size='sm'
                                            value={keyword}
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <Button className="search align-items-center" id="search-icon" onClick={handleSearch}>
                                            <FaSearch />
                                        </Button>
                                    </InputGroup>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-evenly pt-5 pb-5">
                        <div className="col">
                            <div className="table-responsive">
                                <table className="table ">
                                    <thead className="table-dark text-center">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Job Applied</th>
                                            <th scope="col">Current CTC</th>
                                            <th scope="col">Expected CTC</th>
                                            <th scope="col">Preferred Location</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {jobList.map((job, index) => (
                                            <tr key={job.vaccant.jobid}>
                                                <td><strong>{job.users.name}</strong></td>
                                                <td>{job.vaccant.jobtitle}</td>
                                                <td>{job.currentctc}</td>
                                                <td>{job.expectedctc}</td>
                                                <td>{job.preferredlocation}</td>
                                                <td>
                                                    <div className="d-flex justify-content-around">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="25"
                                                            height="25"
                                                            fill="grey"
                                                            viewBox="0 0 24 24"
                                                            onClick={() => downloadResume(job.applyid)}
                                                            style={{ cursor: 'pointer' }}
                                                        >
                                                            <path d="M5 20h14v-2H5v2zm7-18l-6 6h4v6h4v-6h4l-6-6z" />
                                                        </svg>


                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="25"
                                                            height="25"
                                                            fill="green"
                                                            className="bi bi-person-fill-check"
                                                            viewBox="0 0 16 16"
                                                            onClick={() => handleSelect(job.applyid)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                                            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                        </svg>

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="25"
                                                            height="25"
                                                            fill="red"
                                                            className="bi bi-person-fill-slash"
                                                            viewBox="0 0 16 16"
                                                            onClick={() => handleReject(job.applyid)}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                                        </svg>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className='pt-3 d-flex justify-content-center text-center'>
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
        </>
    )
}

export default Applied