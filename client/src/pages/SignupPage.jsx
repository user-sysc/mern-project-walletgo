import { RiLogoutBoxLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/styles.css";
import axios from "axios";

function SignupPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar si los campos están vacíos
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
      // Verificar si el usuario ya está registrado
      const existingUser = await axios.get(
        `http://localhost:4001/usuarios/${formData.email}`
      );
      if (existingUser.data) {
        Swal.fire({
          title: '<strong style="color: white;">¡Registro existente!</strong>',
          html: '<i style="color: white;">El usuario ya se encuentra registrado</i>',
          icon: "warning",
          background: "#12151E",
          confirmButtonColor: "#1DB13E",
          timer: 3000,
        });
        return;
      }

      const response = await axios.post(
        "http://localhost:4001/usuarios",
        formData
      );
      Swal.fire({
        title: '<strong style="color: white;">Registro exitoso!!</strong>',
        html: '<i style="color: white;">El usuario fue registrado con éxito</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      setFormData({ name: "", email: "", password: "" });

      navigate("/Signup");

      // handle successful registration
      console.log(response.data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title:
          '<strong style="color: white;">Hubo un error al registrar el usuario</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 4000,
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
