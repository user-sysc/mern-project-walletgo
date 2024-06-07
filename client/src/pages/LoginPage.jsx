import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";
import "../styles/styles.css";

function LoginPage() {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { signin } = useAuth();

  const handleSubmit = async () => {
    event.preventDefault();
    // Verificar si los campos están vacíos
    if (!formData.email || !formData.password) {
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
      await signin(formData);
      Swal.fire({
        title:
          '<strong style="color: white;">¡Inicio de sesión exitoso!</strong>',
        html: '<i style="color: white;">Has iniciado sesión correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title:
          '<strong style="color: white;">¡Credenciales incorrectas!</strong>',
        html: '<i style="color: white;">El correo electrónico o la contraseña son incorrectos</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.message}</p>`,
      });
    }
  };

  return (
    <section>
      <Link to="/" className="logout-icon">
        <RiLogoutBoxLine size={30} color="#1DB13E" />
      </Link>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleSubmit}>
        <label>Mail</label>
        <input
          type="email"
          placeholder="..."
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <div className="password-container">
          <input
            type={passwordShown ? "text" : "password"}
            placeholder="..."
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <i onClick={togglePasswordVisiblity} className="toggle-password">
            {passwordShown ? <FaEye /> : <FaEyeSlash />}
          </i>
        </div>
        <input type="submit" value="Ingresar" />
      </form>
      <p>
        No tienes una cuenta? <Link to="/Signup">Registro</Link>
      </p>
    </section>
  );
}

export default LoginPage;
