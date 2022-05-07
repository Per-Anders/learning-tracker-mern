import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form = ({ data, setData }) => {

  const { id } = useParams()
  const navigate = useNavigate();


  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    today.getDate();


  const [formData, setFormData] = useState({
    title: "",
    category: "",
    steps: "",
    completionDate: date,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`http://localhost:5000/api/learn/${id}`);
      const body = await result.json();
      setFormData(body);
    }
    fetchData();
  },[])


  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.steps === ""
    ) {
      return;
    }
    const result = await fetch(`http://localhost:5000/api/learn/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: formData.title,
        category: formData.category,
        steps: formData.steps,
        completionDate: formData.completionDate,
        favorited: false,
        completed: false,
        priority: "normal",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setFormData({
      title: "",
      category: "",
      steps: "",
      completionDate: "",
    });

    navigate("/");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <div className="card container" onSubmit={submitFormHandler}>
      <form className="form-group" method="post" action="">
        <input
          className="form-control"
          type="text"
          name="title"
          placeholder="Tittel"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          className="form-control"
          type="text"
          name="category"
          placeholder="Kategori"
          value={formData.category}
          onChange={handleChange}
        />
        <textarea
          className="form-control"
          placeholder="Trinn"
          name="steps"
          rows="10"
          value={formData.steps}
          onChange={handleChange}
        ></textarea>
        <label>Fullført innen</label>
        <input
          className="form-control"
          type="date"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleChange}
        />
        <div className="submit-container">
          <input
            className="btn btn-submit"
            type="submit"
            value="Oppdater"
            name="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
