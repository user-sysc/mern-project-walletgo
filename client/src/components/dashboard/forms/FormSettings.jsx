import { useAuth } from "../../../context/authContext";
import "../../../styles/forms.css";
import { useState } from "react";
import Swal from "sweetalert2";

function FormSettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { user, deleteAccount, logout } = useAuth();

  const handleSubmitPasswordChange = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para cambiar la contraseña

    Swal.fire({
      title:
        '<strong style="color: white;">¡Contraseña cambiada con éxito!</strong>',
      html: '<i style="color: white;">Tu contraseña ha sido actualizada.</i>',
      icon: "success",
      background: "#12151E",
      confirmButtonColor: "#1DB13E",
      timer: 3000,
    });

    // Limpiar el formulario
    setPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      logout;
      Swal.fire({
        title:
          '<strong style="color: white;">¡Cuenta eliminada con éxito!</strong>',
        html: '<i style="color: white;">Tu cuenta ha sido eliminada.</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
      });
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Ha ocurrido un error al intentar eliminar la cuenta</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.message}</p>`,
      });
    }
  };

  return (
    <div className="contact-s" id="contact">
      <div className="rightSide-s">
        <h1 className="h1-contact-s"> Configuración de la cuenta</h1>
        <form className="contact-form-s" onSubmit={handleSubmitPasswordChange}>
          <label className="label-contact-s" htmlFor="password">
            Contraseña actual
          </label>
          <input
            className="input-contact-s"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="..."
            required
          />
          <label className="label-contact-s" htmlFor="newPassword">
            Nueva contraseña
          </label>
          <input
            className="input-contact-s"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="..."
            required
          />
          <label className="label-contact-s" htmlFor="confirmNewPassword">
            Confirmar nueva contraseña
          </label>
          <input
            className="input-contact-s"
            name="confirmNewPassword"
            type="password"
            placeholder="..."
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button className="buton-form-s" type="submit">
            Cambiar contraseña
          </button>
        </form>
        <button
          className="buton-form-s-delete"
          onChange={handleDeleteAccount}
          style={{ marginTop: "20px", backgroundColor: "#f44336" }}
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

export default FormSettings;
