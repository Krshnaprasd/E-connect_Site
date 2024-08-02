
import Type from './TypedAnimation.jsx'

const ProfilePage = () => {

  const [user] = [
    {
      img: "../src/assets/Signage.gif"
    }
  ]




  return (
    <>

      <div className="container-fluid d-flex justify-content-center ">

        <div className="row g-0">
          <div className="col-md-6">
            <img src={user.img} className="img-fluid rounded-start" alt="Img "></img>
          </div>
          <div className="col-md-5  align-content-center" style={{ textAlign: 'justify' }}>
            <div className="">
              <div>
                <p className='fs-2 fw-semibold'>E-connect <Type /></p>
                <p>
                  It is your ultimate personal and professional management portal. Effortlessly track your salary, monitor attendance, request permissions, explore career opportunities, and manage personal details all in one place. With E-Connect, streamline your work life and stay in control with just a few clicks. Experience seamless, intuitive management today!

                </p>

              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default ProfilePage;