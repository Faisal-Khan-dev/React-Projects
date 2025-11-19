// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import TextField from "../components/TextField";
// import ButtonCmp from "../components/ButtonCmp";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// // import React, { useState } from "react";

// const Login = () => {
//   const navigate = useNavigate();

//   const LoginHandler = async () => {

//      const [email, setEmail] = useState("");
//      const [password, setpassword] = useState("");

//     try {

//       console.log("email", email);
//       console.log("password", password);
//       const response = await signInWithEmailAndPassword(auth, email, password);
//       console.log("response" , response);
      
//       // console.log("user Login");
//       // navigate("./Dashboard.jsx");

//     } catch (error) {
//       alert(error.message)
//     }
    
//   };

//   return (
//     <div>
//       <h1>LOGIN</h1>
//       {/* <input type="text" placeholder="Email" />
//       <input type="text" placeholder="password" /> */}
//       <TextField
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <br />
//       <TextField
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setpassword(e.target.value)}
//       />
//       <p>
//         Create Account? <Link to={"/Signup"}> Signup </Link>
//       </p>
//       <ButtonCmp title={"Login"} onClick={LoginHandler} />
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import ButtonCmp from "../components/ButtonCmp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginHandler = async () => {
    try {
      console.log("email:", email);
      console.log("password:", password);

      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("response:", response);

      localStorage.setItem("uid", response.user.uid);

      navigate("./Dashboard");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <TextField
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>
        Create Account? <Link to={"/Signup"}> Signup </Link>
      </p>
      <ButtonCmp title={"Login"} onClick={LoginHandler} />
    </div>
  );
};

export default Login;