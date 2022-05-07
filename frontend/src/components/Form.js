import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = ({ data, setData }) => {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    today.getDate();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    steps: "",
    completionDate: date,
  });

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.category === "" ||
      formData.steps === ""
    ) {
      return;
    }
    const result = await fetch("http://localhost:5000/api/learn/", {
      method: "POST",
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
          value={formData.steps}
          rows="10"
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
            value="Lagre"
            name="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
