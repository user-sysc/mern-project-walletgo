import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/styles.css";
import axios from "axios";

function SignupPage() {
  const registerUser = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!name.value || !email.value || !password.value) {
      Swal.fire({
        title:
          '<strong style="color: white;">Todos los campos son obligatorios</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      return;
    }

    const userExists = await axios
      .get(`http://localhost:4001/userExists?email=${email.value}`)
      .then((response) => response.data);

    if (userExists) {
      Swal.fire({
        title: '<strong style="color: white;">¡Registro existente!</strong>',
        html: '<i style="color: white;">El usuario ya se encuentra registrado</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      return;
    }

    axios
      .post("http://localhost:4001/create", {
        name: name.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        name.value = "";
        email.value = "";
        password.value = "";
        Swal.fire({
          title: '<strong style="color: white;">Registro exitoso!!</strong>',
          html: '<i style="color: white;">El usuario fue registrado con éxito</i>',
          icon: "success",
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
      <h2>Signup</h2>
      <form id="signupForm">
        <label>Nombre</label>
        <input type="text" placeholder="..." id="name" required />
        <label>Mail</label>
        <input type="email" placeholder="..." id="email" required />
        <label>Contraseña</label>
        <input type="password" placeholder="..." id="password" required />
        <input onClick={registerUser} type="submit" value="Registrar" />
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/Login">Login</Link>
      </p>
    </section>
  );
}

export default SignupPage;
