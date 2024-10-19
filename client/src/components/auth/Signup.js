import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";
import { toast } from "react-toastify";
import { institutions, InstitutionList, DepartmentList } from "../Institutions"; // Update the path as needed

const Signup = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "",
    institution: "",
    department: "",
    password: "",
    cpassword: "",
    adminKey: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    console.log(user)
  };

  const PostData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      name,
      email,
      phone,
      userType,
      institution,
      department,
      adminKey,
      password,
      cpassword,
    } = user;

    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          name,
          email,
          phone,
          userType,
          institution,
          department,
          adminKey,
          password,
          cpassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      toast.success("Sign Up Successfull!");

      navigate("/login");
    } catch (error) {
      if (error.response.status === 422 && error.response) {
        setIsLoading(false);
        const data = error.response.data;
        setAuthStatus(data.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <section className="text-gray-600 body-font my-10  min-h-screen flex items-center justify-center bg-white">
          <div className="lg:w-2/6 md:w-1/2 my-10 bg-white shadow-2xl shadow-blue-200 rounded-lg p-8 flex flex-col md:ml-auto md:mr-auto mt-10 md:mt-0">
            <form method="POST">
              <h3 className="text-3xl my-8 sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                Sign <span className="text-indigo-600">Up</span>
              </h3>
              <div className="relative mb-4">
                <label
                  htmlFor="full-name"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  value={user.name}
                  onChange={handleInputs}
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={user.email}
                  onChange={handleInputs}
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phone"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Phone
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  required
                  value={user.phone}
                  onChange={handleInputs}
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="userType"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Your Role
                </label>

                <select
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  id="userType"
                  name="userType"
                  value={user.userType}
                  onChange={handleInputs}>
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  {/* <option value="faculty">HOD</option> */}

                  {process.env.REACT_APP_HOD_FEATURE === "true" && (
                    <option value="student">Student</option>
                  )}
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                  {process.env.REACT_APP_ADMIN_SIGN_UP === "true" && (
                    <option value="admin">Admin</option>
                  )}
                </select>
              </div>

              {user.userType === "admin" ? (
                <>
                  <div className="relative mb-4">
                    <label
                      htmlFor="adminKey"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                      Admin Key
                    </label>
                    <input
                      type="text"
                      required
                      value={user.adminKey}
                      onChange={handleInputs}
                      id="adminKey"
                      name="adminKey"
                      placeholder="Admin Key"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </>
              ) : (
                <>



{/* Institution Dropdown */}
{/* <div className="relative mb-4">
  <label
    htmlFor="institution"
    className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
  >
    Institution
  </label>
  <select
    value={user.institution}
    onChange={handleInputs}
    id="institution"
    name="institution"
    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
  >
    <option value="">Select</option>
    {Object.keys(InstitutionList).map((key) => (
      <option key={key} value={key}>
        {InstitutionList[key]}
      </option>
    ))}
  </select>
</div> */}

{/* Department Dropdown */}
{/* {user.userType !== "director" && (
  <>
{user.institution && (
  <div className="relative mb-4">
    <label
      htmlFor="department"
      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold"
    >
      Department
    </label>
    <select
      value={user.department}
      onChange={handleInputs}
      id="department"
      name="department"
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    >
      <option value="">Select</option>
      {institutions
        .find((inst) => inst.name === InstitutionList[user.institution])
        ?.departments.map((dept, index) => (
          <option key={index} value={Object.keys(DepartmentList).find(key => DepartmentList[key] === dept)}>
            {dept}
          </option>
        ))}
    </select>
  </div>
)}
  </>
  )} */}


{/* 





                  <div className="relative mb-4">
                    <label
                      htmlFor="institution"
                      className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                      Institution
                    </label>

                    <select
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      id="institution"
                      name="institution"
                      value={user.institution}
                      onChange={handleInputs}>
                      <option value="">Select</option>
                      <option value="AITR">
                        Acropolis Institute of Technology and Research
                      </option>
                      <option value="AIMSR">
                        Acropolis Institute of Management Studies & Research
                      </option>
                      <option value="AIPER">
                        Acropolis Institute Of Pharmaceutical Education &
                        Research
                      </option>
                      <option value="AMR">
                        Acropolis Faculty of Management and Research
                      </option>
                      <option value="AILAW">Acropolis Institute of LAW</option>

                      <option value="CDC">Career Development Cell</option>
                      <option value="AC">Acro Care</option>
                    </select>
                  </div>

                  {user.institution === "AIPER" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="AIPER">
                          Acropolis Institute Of Pharmaceutical Education &
                          Research
                        </option>
                      </select>
                    </div>
                  )}

                  {user.institution === "CDC" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="CDC">Career Development Cell</option>
                        <option value="EDC">EDC</option>
                        <option value="PLACEMENT">Placement</option>
                        <option value="TRAINING">Training</option>
                        <option value="IIPC">IIPC</option>
                      </select>
                    </div>
                  )}

                  {user.institution === "AC" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="AC">Acro Care</option>
                      </select>
                    </div>
                  )}

                  {user.institution === "AILAW" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="AILAW">
                          Acropolis Institute of LAW
                        </option>
                      </select>
                    </div>
                  )}

                  {user.institution === "AMR" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="AMR">
                          Acropolis Faculty of Management and Research
                        </option>
                      </select>
                    </div>
                  )}

                  {user.institution === "AIMSR" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="BSC">Bio Science</option>
                        <option value="BBA">
                          Bachelor of Business Administration
                        </option>
                        <option value="AIMSR">
                          Acropolis Institute of Management Studies & Research
                        </option>
                      </select>
                    </div>
                  )}

                  {user.institution === "AITR" && (
                    <div className="relative mb-4">
                      <label
                        htmlFor="department"
                        className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                        Department
                      </label>

                      <select
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        id="department"
                        name="department"
                        value={user.department}
                        onChange={handleInputs}>
                        <option value="">Select</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="EC">Electronics & Communication</option>
                        <option value="CSE">
                          Computer Science & Engineering
                        </option>
                        <option value="AIML">
                          Artificial Intelligence and Machine Learning
                        </option>
                        <option value="IT">Information Technology</option>
                        <option value="CSIT">
                          Computer Science and Information Technology
                        </option>
                        <option value="FCA">
                          Faculty of Computer Applications
                        </option>

                        <option value="HUMI">Huminities</option>
                        <option value="CHEM">Chemistry</option>
                      </select>
                    </div>
                  )} */}
                </>
              )}







              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Password
                </label>
                <input
                  required
                  value={user.password}
                  onChange={handleInputs}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 block uppercase tracking-wide text-gray-700 text-xs font-bold">
                  Confirm Password
                </label>
                <input
                  required
                  value={user.cpassword}
                  onChange={handleInputs}
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  placeholder="Confirm Password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="my-4">
                <p className="text-s text-red-600	 font-bold">{authStatus}</p>
              </div>
              <div className="mx-auto w-fit">
                <div className="mx-auto">
                  <button
                    type="submit"
                    onClick={PostData}
                    className="text-white bg-indigo-600 shadow focus:shadow-outline focus:outline-none border-0 py-2 px-10 font-bold  hover:bg-indigo-800 rounded text-lg">
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-m">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Signup;
