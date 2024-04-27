import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../styles/styles.css";
import axios from "axios";

function SignupPage() {
  // const history = useHistory();

  const registerUser = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!name.value || !email.value || !password.value) {
      Swal.fire({
        title: "<strong>Todos los campos son obligatorios</strong>",
        icon: "warning",
      });
      return;
    }

    const userExists = await axios
      .get(`http://localhost:4001/userExists?email=${email.value}`)
      .then((response) => response.data);

    if (userExists) {
      Swal.fire({
        title: "<strong>¡Registro existente!</strong>",
        html: "<i>El usuario" + { name } + " ya se encuentra registrado</i>",
        icon: "warning",
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
        alert("usuario registrado");
        name.value = "";
        email.value = "";
        password.value = "";
        Swal.fire({
          title: "<strong>Registro exitoso!!</strong>",
          html: "<i>El usuario" + { name } + " fue registrado con éxito</i>",
          icon: "success",
        });
        // history.push("/Login"); //nos redirige a la pagina de login
      });
  };

  return (
    <section>
      <h2>Registro</h2>
      <form id="signupForm">
        <label>Nombre</label>
        <input type="text" placeholder="..." id="name" required />
        <label>Mail</label>
        <input type="email" placeholder="..." id="email" required />
        <label>Contraseña</label>
        <input type="password" placeholder="..." id="password" required />
        <input onClick={registerUser} type="submit" value="Registro" />
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/Login">Login</Link>
      </p>
    </section>
  );
}

export default SignupPage;
