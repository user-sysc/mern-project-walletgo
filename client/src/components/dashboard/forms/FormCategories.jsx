import { useCategory } from "../../../context/categoryContext";
import { useAuth } from "../../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../../styles/form-category.css";
import Swal from "sweetalert2";

import { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

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
        val.title +
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
                val.title +
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
  //
  const handleEditClick = (expense) => {
    Swal.fire({
      title: "Actualizar Egreso",
      html: `
      <div className="form-comp" style="background-color: #000" >
        <form id="updateForm">
          <div className="grid-container">
            <div className="grid-item">
              <label htmlFor="title">Titulo</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="..."
                value="${formData.title}"
              />
            </div>
            <div className="grid-item">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="..."
                value="${formData.description}"
              />
            </div>
            <div className="grid-item">
              <label htmlFor="amount">Monto</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="..."
                value="${formData.amount}"
              />
            </div>
            <div className="grid-item">
              <label htmlFor="category_id">Categoría</label>
              <select id="category_id" name="category_id" value="${
                formData.category_id
              }">
                <option value="">...</option>
                ${categories
                  .map(
                    (categoria) => `
                  <option key="${categoria.id}" value="${categoria.id}">
                    ${categoria.name_category}
                  </option>
                `
                  )
                  .join("")}
              </select>
            </div>
          </div>
        </form>
        </div>
      `,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const amount = document.getElementById("amount").value;
        const category_id = document.getElementById("category_id").value;

        if (!title || !description || !amount || !category_id) {
          Swal.showValidationMessage("Por favor, rellena todos los campos");
        } else {
          return { title, description, amount, category_id };
        }
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
          formData.title +
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
  const data = [
    {
      subject: "Math",
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: "Chinese",
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "English",
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: "Geography",
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: "Physics",
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: "History",
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];
  class Example extends PureComponent {
    render() {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Expenses"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Incomes"
              dataKey="B"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      );
    }
  }

  return (
    <div className="w-full h-full">
      {user && (
        <>
          <div className="form-comp-c">
            <div className="card-c">
              <h1 className="sub-titles-copm">Nueva Categoria</h1>
              <form onSubmit={handleCreateCategory}>
                <div className="grid-container">
                  <div className="grid-item">
                    <label htmlFor="name_category">Nombre Categoria</label>
                    <input
                      type="text"
                      id="name_category"
                      name="name_category"
                      placeholder="..."
                      value={formData.name_category}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button type="submit">Agregar Categoria</button>
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
                          onClick={handleEditClick}
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
