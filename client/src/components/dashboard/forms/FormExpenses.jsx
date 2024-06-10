import { useCategory } from "../../../context/categoryContext";
import { useExpense } from "../../../context/expenseContext";
import "../../../styles/form.css";
import { useState } from "react";

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
  const [editar, setEditar] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [error, setError] = useState("");
  const { getCategory, categories } = useCategory();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category_id: "",
  });
  const { createExpense, getExpense, expenses, deleteExpense, updateExpense } =
    useExpense();

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
              name="Expeneses"
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
      <div className="w-full h-full-2">
        <div className="form-comp">
          <div className="card">
            <h1 className="sub-titles-copm">Nuevo Egreso</h1>
            <form>
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
                    required
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
                <button type="submit">Agregar Egreso</button>
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
            placeholder="Filtrar Egresos"
            autoComplete="off"
          />
          <select id="categoria-filter" name="categoria-filter">
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default FormExpenses;
