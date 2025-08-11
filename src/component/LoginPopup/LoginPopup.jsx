import { useContext, useState } from "react";
import "./LoginPopup.css";
import { axiosInstance } from "../../lib/axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [currState, setCurrState] = useState("Sign In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = currState === "Sign In" ? "/api/user/login" : "/api/user/register";

    try {
      const res = await axiosInstance.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200 || res.status === 201) {
        if (res.data.token) {
          toast.success(`${currState} successful!`);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        }
        setShowLogin(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || `${currState} error:`, error);
      console.error(error.response?.data?.message || `${currState} failed`);
      setData({ name: "", email: "", password: "" });
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
        </div>

        <div className="login-popup-input">
          {currState === "Sign In" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />

          {/* Password field with eye toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="Password"
              required
              style={{
                width: "100%",
                paddingRight: "40px", // space for the icon
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                color: "inherit",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Sign In" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Sign In")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
