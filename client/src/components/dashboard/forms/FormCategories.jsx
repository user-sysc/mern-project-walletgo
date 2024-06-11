import { useCategory } from "../../../context/categoryContext";
import { useAuth } from "../../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../../styles/form-category.css";
import Swal from "sweetalert2";

function FormCategories() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [editar, setEditar] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const {
    getCategory,
    categories,
    createCategory,
    deleteCategory,
    updateCategory,
  } = useCategory();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name_category: "",
  });
  const clean = () => {
    setFormData({
      name_category: "",
    });
    setId("");
    setEditar(false);
  };
  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getCategoryName = (id) => {
    const categoria = categories.find((cat) => cat.id === id);
    return categoria ? categoria.name_category : "";
  };
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await createCategory(formData);
      Swal.fire({
        title: '<strong style="color: white;">¡Registro exitoso!</strong>',
        html: '<i style="color: white;">La categoria se ha registrado correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
      });
      clean();
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
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };
  const handleDeleteCategory = (val) => {
    Swal.fire({
      title: '<strong style="color: white;">Confirmar eliminación</>',
      html:
        '<i style="color: white;">¿Realmente desea eliminar a <strong>' +
        val.name_category +
        "</strong>?</i>",
      icon: "warning",
      background: "#12151E",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(val.id)
          .then(() => {
            Swal.fire({
              title: '<strong style="color: white;">Registro eliminado!</>',
              html:
                '<i style="color: white;">La categoria <strong>' +
                val.name_category +
                '</strong style="color: white;"> fue eliminado exitosamente!</i>',
              icon: "success",
              background: "#12151E",
              confirmButtonColor: "#1DB13E",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: '<strong style="color: white;">¡ERROR!</strong>',
              html: '<i style="color: white;">Ha ocurrido un error al intentar eliminar la categoria</i>',
              icon: "warning",
              background: "#12151E",
              confirmButtonColor: "#1DB13E",
              timer: 3000,
              footer: `<p style="color: white;">${error.response.data.message}</p>`,
            });
          });
      }
    });
  };
  const setCategory = (val) => {
    setEditar(true);
    setFormData({
      name_category: val.name_category,
    });
    setId(val.id);
  };
  const handleEditClick = (category) => {
    Swal.fire({
      title: '<strong style="color: white;">Actualizar Categoria</strong>',
      background: "#12161C",
      confirmButtonColor: "#1DB13E",
      customClass: {
        popup: "custom-swal",
        cancelButton: "cancel-button-class",
      },
      confirmButton: "#1db13e",
      confirmButtonText: "Actualizar",
      cancelButtonColor: "#d32f2f",
      html: `
        <div>
          <form id="updateForm" style="display: flex; flex-direction: column; color: white";>
            <label for="title" style="margin-bottom: 10px; margin-right: 10px;">Nombre Categoria</label>
            <input
              type="text"
              id="name_category"
              name="name_category"
              placeholder="..."
              autoComplete="off"
              value="${category.name_category}"
              style="background-color: #212f3c; color: white; margin-bottom: 10px; padding: 10px; border-radius: 5px; border: none; outline-color: #1db13e;"
            />
          </form>
        </div>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const name_category = document.getElementById("name_category").value;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes manejar los valores de entrada
        console.log(result.value);
      }
    });
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await updateCategory(id, formData);
      clean();
      Swal.fire({
        title: '<strong style="color: white;">Actualización exitosa!</strong>',
        html:
          '<i style="color: white;">La categoria <strong>' +
          formData.name_category +
          '</strong style="color: white;"> fue actualizado con éxito! </i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      await getCategory();
    } catch (error) {
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Parece que hubo un error al actualizar la categoria</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };
  const handleFilterChangeCategory = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    setFilteredCategories(
      categories.filter((category) =>
        category.name_category.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="w-full h-full">
      {user && (
        <>
          <div className="form-comp-c">
            <div className="card-c">
              <h1 className="sub-titles-copm">Nueva Categoria</h1>
              <form
                onSubmit={editar ? handleUpdateCategory : handleCreateCategory}
              >
                <div className="grid-container">
                  <div className="grid-item">
                    <label htmlFor="name_category">Nombre Categoria</label>
                    <input
                      type="text"
                      id="name_category"
                      name="name_category"
                      placeholder="..."
                      autoComplete="off"
                      value={formData.name_category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button type={editar ? "submit_2" : "submit"}>
                    {editar ? "Actualizar" : "Registrar"}
                  </button>
                  {editar && (
                    <button type="button" onClick={clean}>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          {/* <div className="form-graph">
            <Example />
          </div> */}

          <div className="table-card">
            <div className="search-bar">
              <input
                type="text"
                id="producto-filter"
                name="producto-filter"
                placeholder="Filtrar Categorias"
                autoComplete="off"
                value={filterValue}
                onChange={handleFilterChangeCategory}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Nombre Categoria</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.name_category}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={() => setCategory(val)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteCategory(val)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default FormCategories;
