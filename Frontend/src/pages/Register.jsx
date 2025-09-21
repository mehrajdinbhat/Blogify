import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [role,setRole]=React.useState("")
  const[name,setName]=React.useState("")
  const[email,setEmail]=React.useState("")
  const[phone,setPhone]=React.useState("")
  const[password,setPassword]=React.useState("")
  const [education,SetEducation]=React.useState("")
  const [photo,setPhoto]=React.useState("")
  const[photoPreview,setPhotoPreview]=React.useState("")

  const changePhotoHandeler=(e)=>{
    console.log(e);
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend=()=>{
      setPhotoPreview(reader.result)
      setPhoto(file)
    }
  };
  const handleRegister=async(e)=>{
    e.preventDefault();
    console.log({ role, name, email, phone, password, education, photo });

    const formData=new FormData();
    formData.append("role",role)
    formData.append("name",name)
    formData.append("email",email)
    formData.append("phone",phone)
    formData.append("password",password)
    formData.append("education",education)
    formData.append("photo",photo)
   try {
    const {data}=await axios.post("http://localhost:4001/api/users/register",
      formData,{
       
headers:{
  "Content-Type":"multipart/form-data"
     }    
    });
     console.log(data);
   
    alert("User Registerd Successfully");
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    SetEducation("");
    setPhoto("");
    setPhotoPreview("");
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md bg-white shawdow-md rounded-lg p-8">
          <form action="" onSubmit={handleRegister}>
            <div className="font-semibold text-xl item-center text-center">
              Blog<span className="text-blue-500">ify</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Register</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className=" w-full p-2 mb-4 border  rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="Number"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <select
              value={education}
              onChange={(e) => SetEducation(e.target.value)}
              className=" w-full p-2 mb-4 border  rounded-md"
            >
              <option>Select Your Education</option>
              <option value="b.tech">B.tech</option>
              <option value="m.tech">M.tech</option>
              <option value="mba">MBA</option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
            </select>
            <div className="flex item-center mb-4 ">
              <div className="photo w-20 mr-4">
                <img src={photoPreview || "default-image.png"} alt="Photo" />
              </div>
              <input
                type="file"
                onChange={changePhotoHandeler}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <p className="text-center mb-4">
              Already Registerd?{" "}
              <Link className="text-blue-600">Login Now</Link>
            </p>
            <button
              type="submit"
              className="w-full p-1 bg-blue-500 hover:bg-blue-800 duration-300 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register