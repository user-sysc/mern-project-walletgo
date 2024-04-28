import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/styles.css";
import axios from "axios";

function LoginPage() {
  const loginUser = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !password.value) {
      Swal.fire({
        title:
          '<strong style="color: white;">Todos los campos son obligatorios</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      return;
    }

    axios
      .post("http://localhost:4001/login", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            title:
              '<strong style="color: white;">¡Inicio de sesión exitoso!</strong>',
            icon: "success",
            background: "#12151E",
            confirmButtonColor: "#1DB13E",
          });
          // Aquí puedes redirigir al usuario a la página principal
          // history.push("/");
        } else {
          Swal.fire({
            title:
              '<strong style="color: white;">¡Error al iniciar sesión!</strong>',
            icon: "error",
            background: "#12151E",
            confirmButtonColor: "#1DB13E",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title:
            '<strong style="color: white;">¡Error al iniciar sesión!</strong>',
          html: '<i style="color: white;">Por favor, revisa tus credenciales e intenta de nuevo</i>',
          icon: "error",
          background: "#12151E",
          confirmButtonColor: "#1DB13E",
        });
      });
  };

  return (
    <section>
      <Link to="/" className="logout-icon">
        <RiLogoutBoxLine size={30} color="#1DB13E" />
      </Link>
      <h2>Login</h2>
      <form id="loginForm">
        <label>Mail</label>
        <input type="email" placeholder="..." id="email" required />
        <label>Contraseña</label>

        <input type="password" placeholder="..." id="password" required />
        <input onClick={loginUser} type="submit" value="Ingresar" />
      </form>
      <p>
        No tienes una cuenta? <Link to="/Signup">Registro</Link>
      </p>
    </section>
  );
}

export default LoginPage;
