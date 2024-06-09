import "../../../styles/forms.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCategory } from "../../../context/categoryContext";

function FormCategories() {
  const [categoria, setCategoria] = useState("");
  const [formData, setFormData] = useState({
    name_category: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const { createCategory, getCategory } = useCategory();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      limpiar();
      Swal.fire({
        title: '<strong style="color: white;">¡Registro exitoso!</strong>',
        html: '<i style="color: white;">La categoria se ha registrado correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      setFormData({
        name_category: "",
      });
      await getCategory();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Ha ocurrido un error al intentar registrar la categoria</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.message}</p>`,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const limpiar = () => {
    setFormData({
      name_category: "",
    });
    setId("");
    setEditar(false);
  };

  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Agregar Categoría</h1>
        <form className="contact-form" onSubmit={handleCreateCategory}>
          <label className="label-contact" htmlFor="categoria">
            Nombre de la Categoría
          </label>
          <input
            className="input-contact"
            name="name_category"
            placeholder="..."
            type="text"
            value={formData.name_category}
            onChange={handleChange}
            required
          />
          <button className="buton-form" type="submit">
            {" "}
            Agregar Categoría
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategories;
