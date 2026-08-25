import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service";
import logo from "../../assets/mdss.png"
const Login = () => {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  email: "",
  password: "",
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
// handle login
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await loginUser(formData);
    //  console.log("Response =>", response);
    // console.log("Token =>", response.token);

    // console.log(response);
// console.log(response);
// console.log(response.user);
    // First Login Check
if (response.firstLogin) {
  // Token भी Save करो
  localStorage.setItem("token", response.token);

  localStorage.setItem("user", JSON.stringify(response.user));

  alert(response.message);

  navigate("/change-password");

  return;
}

// Normal Login
localStorage.setItem("token", response.token);
localStorage.setItem("user", JSON.stringify(response.user));

alert("Login Successful");

if (response.user.role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/staff/dashboard");
}

  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className=" mb-8">

         <div className="flex items-center gap-3">
  {/* Logo */}
 <div className="w-16 h-16 rounded-full  flex items-center justify-center">
  <img 
    src={logo} 
    alt="MDSS HRMS Logo"
    className="w-full h-full object-cover"
  />
</div>

  {/* Logo Text */}
 <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 font-sans">
  MDSS HRMS
</div>
</div>
         

          <h1 className="text-3xl font-bold mt-4">
            Sign in
          </h1>

         <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
          Access your MDSS workspace
        </p>

        </div>

        {/* Form */}

      <form onSubmit={handleLogin}>

          <Input
            label="Work Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

          <div className="flex justify-end mb-6">

          <button
          type="button"
          onClick={() => navigate("/forgot-password")}
          className="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>

          </div>
            <Button type="submit">
              {loading ? "Signing ..." : "→ Sign in in to MDSS"}
            </Button>
          
        </form>
        <div className="mt-5 p-3 sm:p-4 bg-blue-50 border border-blue-100 rounded-xl shadow-sm text-center">
          <p className="text-xs sm:text-sm text-blue-700 font-medium">
            This system is exclusively for MDSS employees.Only @mdss.tech and @mdss.com accounts can sign in.
          </p>
        </div>

      </div>
    </AuthLayout>
  );
};

export default Login;