import "../../../styles/form.css";
import { useState } from "react";
import { useIncome } from "../../../context/incomeContext";
// import { useCategory } from "../../../context/categoryContext";

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
  // const { getCategory, categorias } = useCategory();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    monto: "",
    categoria: "",
  });
  const { createIncome, getIncome, incomes, deleteIncome, updateIncome } =
    useIncome();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
              name="Mike"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Lily"
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
      <div className="w-full h-full-2">
        <div className="form-comp">
          <div className="card">
            <h1 className="sub-titles-copm">Nuevo Ingreso</h1>
            <form>
              <div className="grid-container">
                <div className="grid-item">
                  <label htmlFor="title">Titulo</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="..."
                    value={formData.titulo}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid-item">
                  <label htmlFor="description">Descripción</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="..."
                    value={formData.descripcion}
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="grid-item">
                  <label htmlFor="amount">Monto</label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="..."
                    value={formData.monto}
                  />
                </div>
                <div className="grid-item">
                  <label htmlFor="idCategoria">Categoría</label>
                  <select id="idCategoria" name="idCategoria" required>
                    <option value="">Seleccione una categoría</option>
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default FormIncomes;
