import "../../../styles/forms.css";
import Swal from "sweetalert2";
import { useState } from "react";

function FormExpenses() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [categorias] = useState(["Categoria 1", "Categoria 2", "Categoria 3"]); // Reemplaza esto con tus categorías

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title:
        '<strong style="color: white;">¡Hemos recibido tu egreso!</strong>',
      html: '<i style="color: white;">Gracias por agregar un nuevo egreso. Lo procesaremos a la brevedad.</i>',
      icon: "success",
      background: "#12151E",
      confirmButtonColor: "#1DB13E",
      timer: 3000,
    });

    // Limpiar el formulario
    setTitulo("");
    setDescripcion("");
    setMonto("");
    setCategoria("");
  };

  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Agregar Egreso</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="label-contact" htmlFor="titulo">
            Título
          </label>
          <input
            className="input-contact"
            name="titulo"
            placeholder="..."
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="descripcion">
            Descripción
          </label>
          <input
            className="input-contact"
            name="descripcion"
            placeholder="..."
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="monto">
            Monto
          </label>
          <input
            className="input-contact"
            name="monto"
            placeholder="..."
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
          <label className="label-contact" htmlFor="categoria">
            Categoría
          </label>
          <select
            className="input-contact"
            name="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="buton-form" type="submit">
            {" "}
            Agregar Egreso
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormExpenses;
