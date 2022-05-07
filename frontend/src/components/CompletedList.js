import ItemComponent from "./ItemComponent";

const DisplayList = ({
  data,
  onDeleteHandler,
  completeItemHandler,
  favoriteHandler,
}) => {
  const favoriteData = data.filter((data) => data.completed === true);

  return (
    <>
      {favoriteData.map((item) => {
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

export default DisplayList;
