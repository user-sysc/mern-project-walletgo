import { Link } from "react-router-dom";
import "../styles/styles.css";

function SignupPage() {
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
        <input type="submit" value="Registro" />
      </form>
      <p>
        Ya tienes una cuenta? <Link to="/Login">Login</Link>
      </p>
    </section>
  );
}

export default SignupPage;
