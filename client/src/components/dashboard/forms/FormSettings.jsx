import "../../../styles/Contact.css";
import Swal from "sweetalert2";
import { useState } from "react";

function FormSettings() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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

  const handleDeleteAccount = () => {
    // Aquí puedes agregar la lógica para eliminar la cuenta
  };

  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Configuración de la cuenta</h1>
        <form className="contact-form" onSubmit={handleSubmitPasswordChange}>
          <label className="label-contact" htmlFor="password">
            Contraseña actual
          </label>
          <input
            className="input-contact"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="newPassword">
            Nueva contraseña
          </label>
          <input
            className="input-contact"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="confirmNewPassword">
            Confirmar nueva contraseña
          </label>
          <input
            className="input-contact"
            name="confirmNewPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          <button className="buton-form" type="submit">
            Cambiar contraseña
          </button>
        </form>
        <button
          className="buton-form"
          onClick={handleDeleteAccount}
          style={{ marginTop: "20px" }}
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

export default FormSettings;
