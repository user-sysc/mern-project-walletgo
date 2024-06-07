import "../../../styles/Contact.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { useCategory } from "../../../context/categoryContext";

function FormCategories() {
  const [formData, setFormData] = useState({
    name_category: "",
  });
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const {
    createCategory,
    getCategory,
    categorias,
    deleteCategory,
    updateCategory,
  } = useCategory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateCategoria = async (e) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "La categoria ha sido registrado correctamente.",
      });
      setFormData({
        name_category: "",
      });
      await getCategory();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: error.response.data.message,
        footer: error,
      });
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="rightSide">
        <h1 className="h1-contact"> Agregar Categoría</h1>
        <form className="contact-form" onSubmit={handleCreateCategoria}>
          <label className="label-contact" htmlFor="categoria">
            Nombre de la Categoría
          </label>
          <input
            className="input-contact"
            id="name_category"
            name="categoria"
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de Categoria</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{categoria.fechaCreacion.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FormCategories;
