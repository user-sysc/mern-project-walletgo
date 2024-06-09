import { useCategory } from "../../../context/categoryContext";
import { useIncome } from "../../../context/incomeContext";
import { useAuth } from "../../../context/authContext";
import "../../../styles/form.css";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

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
  const [editar, setEditar] = useState(false);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");

  const { createIncome, getIncome, incomes } = useIncome();
  const { getCategory, categories } = useCategory();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    monto: "",
    categoria: "",
  });

  const clean = () => {
    setFormData({
      titulo: "",
      descripcion: "",
      monto: "",
      categoria: "",
    });
    setId("");
    setEditar(false);
  };

  useEffect(() => {
    getCategory();
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
    return categoria ? categoria.name_category : "Desconocida";
  };
  const handleCreateIncome = async (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.descripcion || !formData.monto) {
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
      await createIncome(formData);
      Swal.fire({
        title: '<strong style="color: white;">¡Registro exitoso!</strong>',
        html: '<i style="color: white;">El ingreso se ha registrado correctamente</i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 2000,
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
        footer: `<p style="color: white;">${error.message}</p>`,
      });
    }
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
                      <label htmlFor="titulo">Titulo</label>
                      <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="..."
                        value={formData.titulo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="descripcion">Descripción</label>
                      <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="..."
                        value={formData.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="monto">Monto</label>
                      <input
                        type="number"
                        id="monto"
                        name="monto"
                        placeholder="..."
                        value={formData.monto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="categoria">Categoría</label>
                      <select
                        id="categoria"
                        name="categoria"
                        value={formData.categoria}
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
                placeholder="Filtrar ingresos"
                autoComplete="off"
              />
              <select id="categoria-filter" name="categoria-filter">
                <option value="">Seleccione una categoría</option>
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
                      <td>{val.titulo}</td>
                      <td>{val.descripcion}</td>
                      <td>{val.monto}</td>
                      <td>{getCategoryName(val.idCategoria)}</td>
                      <td>{val.createdAT}</td>
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
