import { Link } from "react-router-dom";

const ItemComponent = ({
  item,
  onDeleteHandler,
  completeItemHandler,
  favoriteHandler,
}) => {
  return (
    <div className="card list-card">
      <span className="delete-button" onClick={() => onDeleteHandler(item._id)}>
        x
      </span>
      <div className="title">
        <Link to={`/learn/${item._id}`}>{item.title}</Link>
      </div>
      <div>Kategori: {item.category}</div>
      <pre>{item.steps}</pre>
      <div>
        Deadline: {new Date(item.completionDate).toLocaleDateString("no-NB")}
      </div>
      <div className="status">
        {item.completed.toString() === "true" ? "Fullført" : "Ikke fullført"}
      </div>
      <span
        className="complete-btn"
        onClick={() => completeItemHandler(item._id, item.completed)}
      >
        Endre status
      </span>
      <span
        className="favorite-btn"
        onClick={() => favoriteHandler(item._id, item.favorited)}
      >
        {item.favorited === true ? <span>&#9829;</span> : <span>&#9825;</span>}
      </span>
    </div>
  );
};

export default ItemComponent;
