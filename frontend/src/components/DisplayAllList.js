import ItemComponent from "./ItemComponent";

const DisplayAllList = ({
  data,
  onDeleteHandler,
  completeItemHandler,
  favoriteHandler,
}) => {
  const filteredData = data.filter((data) => data.completed === false);

  return (
    <>
      {filteredData.map((item) => {
        return (
          <ItemComponent
            item={item}
            key={item._id}
            onDeleteHandler={onDeleteHandler}
            completeItemHandler={completeItemHandler}
            favoriteHandler={favoriteHandler}
          />
        );
      })}
    </>
  );
};

export default DisplayAllList;
