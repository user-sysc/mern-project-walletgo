import { useCategory } from "../../../context/categoryContext";
import { useExpense } from "../../../context/expenseContext";
import { useAuth } from "../../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../../styles/form.css";
import { format } from "date-fns";
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

function FormExpenses() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [editar, setEditar] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterValueCategory, setFilterValueCategory] = useState("");

  const { createExpense, getExpense, expenses, deleteExpense, updateExpense } =
    useExpense();
  const { getCategory, categories } = useCategory();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category_id: "",
  });
  const clean = () => {
    setFormData({
      title: "",
      description: "",
      amount: "",
      category_id: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getCategory();
    getExpense();
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

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
  const handleCreateExpense = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.amount) {
      Swal.fire({
        title:
          '<strong style="color: white;">Todos los campos son obligatorios</strong>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
      });
      return;
    }
    try {
      console.log(formData);
      await createExpense(formData);
      Swal.fire({
        title: '<strong style="color: white;">¡Registro exitoso!</strong>',
        html: '<i style="color: white;">El egreso se ha registrado correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
      });
      clean();
      await getExpense();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Ha ocurrido un error al intentar registrar el egreso</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };
  const handleDeleteExpense = (val) => {
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
        deleteExpense(val.id)
          .then(() => {
            Swal.fire({
              title: '<strong style="color: white;">Registro eliminado!</>',
              html:
                '<i style="color: white;">El Egreso <strong>' +
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
              html: '<i style="color: white;">Ha ocurrido un error al intentar eliminar el egreso</i>',
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
  const setExpense = (val) => {
    setEditar(true);
    setFormData({
      title: val.title,
      description: val.description,
      amount: val.amount,
      category_id: val.category_id,
    });
    setId(val.id);
  };
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
  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(id, formData);
      clean();
      Swal.fire({
        title: '<strong style="color: white;">Actualización exitosa!</strong>',
        html:
          '<i style="color: white;">El Egreso <strong>' +
          formData.title +
          '</strong style="color: white;"> fue actualizado con éxito! </i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      await getExpense();
    } catch (error) {
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Parece que hubo un error al actualizar el egreso</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };
  const handleFilterChangeExpense = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    setFilteredExpenses(
      expenses.filter(
        (expense) =>
          expense.title.toLowerCase().includes(query) ||
          getCategoryName(expense.id).toLowerCase().includes(query)
      )
    );
  };
  const handleFilterChangeCategory = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValueCategory(e.target.value);
    setFilteredExpenses(
      expenses.filter((expense) =>
        String(expense.category_id).toLowerCase().includes(query)
      )
    );
  };
  const formatFecha = (fecha) => {
    return format(new Date(fecha), "dd/MM/yyyy");
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
          <div className="w-full h-full-2">
            <Example />
          </div>
          <div className="form-graph">
            <Example />
          </div>

          <div className="table-card">
            <div className="search-bar">
              <input
                type="text"
                id="producto-filter"
                name="producto-filter"
                placeholder="Filtrar Egresos"
                autoComplete="off"
                value={filterValue}
                onChange={handleFilterChangeExpense}
              />
              <select
                id="categoria-filter"
                name="categoria-filter"
                value={filterValueCategory}
                onChange={handleFilterChangeCategory}
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name_category}
                  </option>
                ))}
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Categoria</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.amount}</td>
                      <td>{getCategoryName(val.category_id)}</td>
                      <td>
                        <button
                          className="edit-button"
                          onClick={handleEditClick}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteExpense(val)}
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

export default FormExpenses;
