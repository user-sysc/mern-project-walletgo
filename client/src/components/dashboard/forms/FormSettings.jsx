import { useAuth } from "../../../context/authContext";
import "../../../styles/forms.css";
import { useState } from "react";
import Swal from "sweetalert2";

function FormSettings() {
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const { user, deleteAccount, logout } = useAuth();
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
      await deleteAccount(id);
      Swal.fire({
        title:
          '<strong style="color: white;">¡Cuenta eliminada con éxito!</strong>',
        html: '<i style="color: white;">Tu cuenta ha sido eliminada.</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
      });
      logout();
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
    user && (
      <div className="contact-s" id="contact">
        <div className="rightSide-s">
          <h1 className="h1-contact-s">Configuración de la cuenta</h1>
          <form className="contact-form-s" onSubmit={handleSubmitPasswordChange}>
            <label className="label-contact-s" htmlFor="password">
              Contraseña actual
            </label>
            <input
              className="input-contact-s"
              name="password"
              type="password"
              autoComplete="off"
              placeholder="..."
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label className="label-contact-s" htmlFor="newPassword">
              Nueva contraseña
            </label>
            <input
              className="input-contact-s"
              name="newPassword"
              type="password"
              autoComplete="off"
              placeholder="..."
              value={formData.newPassword}
              onChange={handleChange}
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
              autoComplete="off"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
            <button className="buton-form-s" type="submit">
              Cambiar contraseña
            </button>
          </form>
          <button
            className="buton-form-s-delete"
            onClick={handleDeleteAccount}
            style={{ marginTop: "20px", backgroundColor: "#f44336" }}
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    )
  );
}
export default FormSettings;

