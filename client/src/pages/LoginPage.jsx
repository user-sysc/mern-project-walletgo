import { Link } from "react-router-dom";
import "../styles/styles.css";

function LoginPage() {
  return (
    <section>
      <h2>Login</h2>
      <form id="loginForm">
        <label>Mail</label>
        <input type="email" placeholder="..." id="email" required />
        <label>Contraseña</label>

        <input type="password" placeholder="..." id="password" required />
        <input type="submit" value="Ingresar" />
      </form>
      <p>
        No tienes una cuenta? <Link to="/Signup">Registro</Link>
      </p>
    </section>
  );
}

export default LoginPage;
