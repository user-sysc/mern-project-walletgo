import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/styles.css";
import { useAuth } from "../context/authContext";

function SignupPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const { signup, isAuthenticated } = useAuth();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/login");
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        title:
          '<strong style="color: white;">Todos los campos son obligatorios</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      return;
    }
    try {
      await signup(formData);
      Swal.fire({
        title: '<strong style="color: white;">Registro exitoso!!</strong>',
        html: '<i style="color: white;">El usuario fue registrado con éxito</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        title:
          '<strong style="color: white;">Hubo un error al registrar el usuario</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 4000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };

  return (
    <section>
      <Link to="/" className="logout-icon">
        <RiLogoutBoxLine size={30} color="#1DB13E" />
      </Link>
      <h2>Signup</h2>
      <form id="signupForm" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="..."
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Mail</label>
        <input
          type="email"
          placeholder="..."
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <div className="password-container">
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="..."
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <i onClick={togglePasswordVisiblity} className="toggle-password">
            {passwordShown ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>
        <input type="submit" value="Registrar" />
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/Login">Login</Link>
      </p>
    </section>
  );
}

export default SignupPage;
