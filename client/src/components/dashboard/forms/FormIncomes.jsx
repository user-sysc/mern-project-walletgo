import IncomePieChart from "../../dashboard/charts/IncomePieChart";
import Example from "../../dashboard/charts/Example";
import { useCategory } from "../../../context/categoryContext";
import { useIncome } from "../../../context/incomeContext";
import { useAuth } from "../../../context/authContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../../../styles/form.css";
import Swal from "sweetalert2";

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
    getIncome();
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
  const setIncome = (val) => {
    setEditar(true);
    setFormData({
      title: val.title,
      description: val.description,
      amount: val.amount,
      category_id: val.category_id,
    });
    setId(val.category_id);
  };
  //
  const handleEditClick = (income) => {
    Swal.fire({
      title: '<strong style="color: white;">Actualizar Ingreso</strong>',
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
            <label for="title" style="margin-bottom: 5px">Titulo</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="..."
              value="${income.title}"
              style="background-color: #212f3c; color: white; margin-bottom: 10px; padding: 10px; border-radius: 5px; border: none; outline-color: #1db13e;"
            />
            <label for="description" style="margin-bottom: 5px">Descripción</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="..."
              value="${income.description}"
              style="background-color: #212f3c; color: white; margin-bottom: 10px; padding: 10px; border-radius: 5px; border: none; outline-color: #1db13e;"
            />
            <label for="amount" style="margin-bottom: 5px">Monto</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="..."
              value="${income.amount}"
              style="background-color: #212f3c; color: white; margin-bottom: 10px; padding: 10px; border-radius: 5px; border: none; outline-color: #1db13e;"
            />
            <label for="category_id" style="margin-bottom: 5px">Categoría</label>
            <select id="category_id" name="category_id" value="${
              income.category_id
            }" style="background-color: #212f3c; color: white; margin-bottom: 10px; padding: 10px; border-radius: 5px; border: none; outline-color: #1db13e;">
              <option value="">...</option>
              ${categories
                .map(
                  (categoria) => `
                <option key="${categoria.id}" value="${categoria.id}" ${
                    categoria.id === income.category_id ? "selected" : ""
                  }>
                  ${categoria.name_category}
                  </option>
              `
                )
                .join("")}
            </select>
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
          Swal.showValidationMessage(
            "Por favor, todos los campos son obligatorios"
          );
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
  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    try {
      await updateIncome(id, formData);
      clean();
      Swal.fire({
        title: '<strong style="color: white;">Actualización exitosa!</strong>',
        html:
          '<i style="color: white;">El Ingreso <strong>' +
          formData.title +
          '</strong style="color: white;"> fue actualizado con éxito! </i>',
        icon: "success",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
      });
      await getIncome();
    } catch (error) {
      Swal.fire({
        title: '<strong style="color: white;">¡ERROR!</strong>',
        html: '<i style="color: white;">Parece que hubo un error al actualizar el ingreso</i>',
        icon: "warning",
        background: "#12151E",
        confirmButtonColor: "#1DB13E",
        timer: 3000,
        footer: `<p style="color: white;">${error.response.data.message}</p>`,
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

  return (
    <div className="w-full h-full">
      {user && (
        <>
          <div className="w-full h-full-2">
            <div className="form-comp">
              <div className="card">
                <h1 className="sub-titles-copm">Nuevo Ingreso</h1>
                <form
                  onSubmit={editar ? handleUpdateIncome : handleCreateIncome}
                >
                  <div className="grid-container">
                    <div className="grid-item">
                      <label htmlFor="title">Titulo</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="..."
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid-item">
                      <label htmlFor="category_id">Categoría</label>
                      <select
                        id="category_id"
                        name="category_id"
                        autoComplete="off"
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
                    <button type={editar ? "submit_2" : "submit"}>
                      {editar ? "Actualizar" : "Agregar Ingreso"}
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
            <div className="form-graph">
              <IncomePieChart />
              {/* <Example /> */}
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
                        <button
                          className="edit-button"
                          onClick={() => setIncome(val)}
                        >
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
