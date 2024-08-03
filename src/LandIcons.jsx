import React from 'react'

const LandIcons =  () => {





const [user] = [
    {
      img:"../src/assets/About.avif",
      img1:"../src/assets/Profile.avif",
      img2:"../src/assets/HR.avif",
      img3:"../src/assets/Request.jpg",
      img4:"../src/assets/Punchlist.avif"
    
    }
  ]

return(
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
            <p style={{textAlign:'justify'}}>
            We are creating the next generation! What we coach, Is our foundation of mentee! We are excited to innovate the best methods of solving problems for every individual student so that will be easy to develop their knowledge and skill.
            </p>
            <div className='text-start text-xs-center'><a href="/elearn">Read more</a></div>
         </div>
         </div>
            <div className="col-md-6 text-end order-md-2 order-1">
              <img src={user.img} className="img-fluid" alt="Img "></img>
            </div>
            
         </div>
         <div className="row  justify-content-center" id='profile'>
         <div className="col-md-6 pt-4 pb-4 text-end order-md-1">
                <img className='img-fluid' src={user.img1}></img>
            </div>
            <div className="col-md-6 pt-4 pb-4 align-content-center order-md-2">
            <div className="card border-0 ">
              <button className="p-txt border-0 fs-2 fw-semibold">
                Profile Info
            </button><br></br>
            <p style={{textAlign:'justify'}}>
            The Profile Panel allows you to effortlessly manage and update your profile with essential information. Enter and review basic details, account information, and personal preferences in one streamlined interface, ensuring your data is always current and accessible.            </p>
            <div><a href="/prof">Read more</a></div>
         </div>
            </div>
            
         </div>
         <div className="row  justify-content-evenly" id="hr">
        
            <div className="col-md-6 pt-5 pb-3 align-content-center order-md-1 order-2">
            <div className="card border-0 ">
              <button className="h-txt border-0 fs-2 fw-semibold">
                HR
            </button><br></br>
            <p style={{textAlign:'justify'}}>
            Our HR Panel offers a comprehensive solution for managing your workforce efficiently. Seamlessly track salaries, monitor attendance, and stay updated on job openings, all from one intuitive platform. Enhance your HR operations with real-time insights and streamline your processes effortlessly.            </p>
            <div><a href="/hr">Read more</a></div>
         </div>
            </div>
            <div className="col-md-6 pt-5 pb-3 order-md-2 order-1">
                <img className='img-fluid' src={user.img2}></img>
            </div>
         </div>
         <div className="row pt-3 pb-3 justify-content-center" id='request'>
         <div className="col-md-6 text-end order-md-1">
                <img className='img-fluid' src={user.img3}></img>
            </div>
            <div className="col-md-6 align-content-center order-md-2">
            <div className="card border-0 ">
              <button className="r-txt border-0 fs-2 fw-semibold">
                Requests
            </button><br></br>
            <p style={{textAlign:'justify'}}>
            The Request Panel empowers you to manage your requests with ease. Submit leave applications, seek permission, or request salary advances through a user-friendly interface, ensuring all your needs are addressed swiftly and efficiently.            <div><a href="/req">Read more</a></div>
         </p></div>
            </div>
          
         </div>
         <div className="row  justify-content-center" id='punch'>
        
            <div className="col-md-6 pt-4 pb-3 align-content-center order-md-1 order-2">
            <div className="card border-0 ">
              <button className="pu-txt border-0 fs-2 fw-semibold">
                Punchlists
            </button><br></br>
            <p style={{textAlign:'justify'}}>

            The Punchlist Panel provides precise tracking of check-ins and check-outs, capturing day, time, and date details. Effortlessly monitor attendance and ensure accurate records with this intuitive feature.</p>            <div><a href="/punch">Read more</a></div>
         </div>
            </div>
            <div className="col-md-6 pt-4 pb-3 text-end order-md-2 order-1">
                <img className='img-fluid' src={user.img4}></img>
            </div>
         </div>
       
       
    </div>
</div>
</div>


</>


)    
}

export default LandIcons;