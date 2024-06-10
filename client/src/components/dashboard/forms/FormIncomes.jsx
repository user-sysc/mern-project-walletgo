import { useCategory } from "../../../context/categoryContext";
import { useIncome } from "../../../context/incomeContext";
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

function FormIncomes() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [editar, setEditar] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [filterValueCategory, setFilterValueCategory] = useState("");

  const { createIncome, getIncome, incomes, deleteIncome, updateIncome } =
    useIncome();
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
    getIncome();
  }, []);

  useEffect(() => {
    setFilteredIncomes(incomes);
  }, [incomes]);

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
  const handleCreateIncome = async (e) => {
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
      await createIncome(formData);
      Swal.fire({
        title: '<strong style="color: white;">¡Registro exitoso!</strong>',
        html: '<i style="color: white;">El ingreso se ha registrado correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
      });
      clean();
      await getIncome();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Ha ocurrido un error al intentar registrar el ingreso</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
      });
    }
  };
  const handleDeleteIncome = (val) => {
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
        deleteIncome(val.id)
          .then(() => {
            Swal.fire({
              title: '<strong style="color: white;">Registro eliminado!</>',
              html:
                '<i style="color: white;">El Ingreso <strong>' +
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
              html: '<i style="color: white;">Ha ocurrido un error al intentar eliminar el ingreso</i>',
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
  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    try {
      await updateIncome(id, formData);
      clean();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html:
          "<i>El Ingreso <strong>" +
          formData.title +
          "</strong> fue actualizado con éxito! </i>",
        icon: "success",
      });
      await getIncome();
    } catch (error) {
      setError(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Parece que hubo un error al actualizar el ingreso!",
        footer: '<a href="#">Intente más tarde</a>',
      });
    }
  };
  const handleFilterChangeIncome = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValue(e.target.value);
    setFilteredIncomes(
      incomes.filter(
        (income) =>
          income.title.toLowerCase().includes(query) ||
          getCategoryName(income.id).toLowerCase().includes(query)
      )
    );
  };
  const handleFilterChangeCategory = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterValueCategory(e.target.value);
    setFilteredIncomes(
      incomes.filter((income) =>
        String(income.category_id).toLowerCase().includes(query)
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
            <div className="form-comp">
              <div className="card">
                <h1 className="sub-titles-copm">Nuevo Ingreso</h1>
                <form onSubmit={handleCreateIncome}>
                  <div className="grid-container">
                    <div className="grid-item">
                      <label htmlFor="title">Titulo</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="..."
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="description">Descripción</label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="..."
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="amount">Monto</label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="..."
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="category_id">Categoría</label>
                      <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                      >
                        <option value="">...</option>
                        {categories.map((categoria) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.name_category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <button type="submit">Agregar Ingreso</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="form-graph">
              <Example />
            </div>
          </div>

          <div className="table-card">
            <div className="search-bar">
              <input
                type="text"
                id="producto-filter"
                name="producto-filter"
                placeholder="Filtrar Ingresos"
                autoComplete="off"
                value={filterValue}
                onChange={handleFilterChangeIncome}
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
                {filteredIncomes.map((val, key) => {
                  return (
                    <tr key={val.id}>
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.amount}</td>
                      <td>{getCategoryName(val.category_id)}</td>
                      <td>
                        <button className="edit-button">
                          <FaEdit />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteIncome(val)}
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

export default FormIncomes;
