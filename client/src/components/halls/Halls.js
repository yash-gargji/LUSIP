import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"
import axios from 'axios';
import LoadingSpinner from "../LoadingSpinner";

// import BookingForm from "./BookingForm";

const Halls = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const getHallsData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/halls`, {
        withCredentials: true, // include credentials in the request
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const data = response.data;
      // console.log(data);
      setUserData(data.halls);
      setIsLoading(false);

      if (response.status !== 200) {
        throw new Error(response.error);
      }
    } catch (error) {
      // console.log(error);
      navigate("/login");
    }
  };



  useEffect(() => {

    getHallsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBookingClick = (hallId, hallName) => {
    navigate(`/bookingForm/${hallId}/${hallName}`)
  };


  // const hallId =userData.hallId
  // const hallName = userData.hallName

  // const handleBookingClick = (hallId,hallName) => {
  //   navigate('/bookingForm', { state: { hallId, hallName } });

  // };


  // const handleBookingClick = () => {
  //   sendData(data);
  // };


  return (
<>{isLoading ? (
          <LoadingSpinner />
        ) : 
    <div className="mt-6 min-h-screen"> 
    
    <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-3xl text-center text-gray-800 font-black leading-7 ml-3 md:leading-10">
   Available <span className="text-indigo-700"> Projects</span>  </h1>

      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((hall) => (
          <div key={hall._id} className="my-2 ">
            <div className="flex w-full items-center justify-center">
              <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-8/12 bg-white">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                  <div className="col-span-1 lg:col-span-9">
                    <div className="text-center lg:text-left">
                      <h2 className="text-2xl font-bold text-zinc-700">{hall.name}</h2>

                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Location</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{hall.location}</p>
                      </div>
                    </div>



                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Capacity</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{hall.capacity}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Amenities</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{hall.amenities}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                      <div>
                        <p className="font-bold text-zinc-700">Description</p>
                      </div>

                      <div>
                        <p className="text-m font-semibold text-zinc-700">{hall.description}</p>
                      </div>
                    </div>










                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                        onClick={() => handleBookingClick(hall._id, hall.name)}
                      >
                        Apply Now
                      </button>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

          
        ))
      ) : (
        <h2 className="text-2xl font-bold text-zinc-700  text-center mt-10">No Projects Found</h2>
      )}

      </div>
}
    </>
  );
};

export default Halls;
