import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import DisplayAllList from "./components/DisplayAllList";
import NavBar from "./components/NavBar";
import "./App.css";
import EditForm from "./components/EditForm";
import FavoriteList from "./components/FavoriteList";
import CompletedList from "./components/CompletedList";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch("http://localhost:5000/api/learn/");
      const body = await result.json();
      setData(body);
    };
    fetchData();
  }, [data]);

  const confirmDelete = async (id) => {
    const result = await fetch(`http://localhost:5000/api/learn/${id}`, {
      method: "DELETE",
    });
  };

  const onDeleteHandler = (id) => {
    if (window.confirm("Slette?")) {
      confirmDelete(id);
    } else {
      return;
    }
  };

  const completeItemHandler = async (id, completed) => {
    const status = !completed;

    const result = await fetch(`http://localhost:5000/api/learn/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const favoriteHandler = async (id, favorited) => {
    const status = !favorited;
    const result = await fetch(`http://localhost:5000/api/learn/${id}`, {
      method: "PUT",
      body: JSON.stringify({ favorited: status }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <DisplayAllList
                data={data}
                onDeleteHandler={onDeleteHandler}
                completeItemHandler={completeItemHandler}
                favoriteHandler={favoriteHandler}
              />
            }
          />
          <Route path="/new" element={<Form data={data} setData={setData} />} />
          <Route path="/learn/:id" element={<EditForm />} />
          <Route
            path="/favorite"
            element={
              <FavoriteList
                data={data}
                onDeleteHandler={onDeleteHandler}
                completeItemHandler={completeItemHandler}
                favoriteHandler={favoriteHandler}
              />
            }
          />
          <Route
            path="/completed"
            element={
              <CompletedList
                data={data}
                onDeleteHandler={onDeleteHandler}
                completeItemHandler={completeItemHandler}
                favoriteHandler={favoriteHandler}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
