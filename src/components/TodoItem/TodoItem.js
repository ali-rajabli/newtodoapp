function TodoItem(props) {
  const { item } = props;

  const styleTodoItem = {
    border: "1px solid #ddd",
    padding: "5px",
  };

  const onChangeCallBack = (event) => {
    const { changeCompleted } = props;

    changeCompleted(item.id, event.target.checked);
  };

  const onClickCallBack = () => {
    const { deleteItem } = props;
    deleteItem(item.id);
  };

  return (
    <div style={styleTodoItem} className="row">
      <div className="col-2">
        <input type="checkbox" onChange={onChangeCallBack} />
      </div>
      <div
        className="col-8"
        style={{
          textDecoration: item.completed ? "line-through" : "none",
          color: item.completed ? "gray" : "black",
        }}
      >
        {item.title}
      </div>
      <div className="col-2">
        <button
          style={{
            background: "transparent",
            border: "none",
            fontSize: "24px",
            color: "red",
            fontWeight: "600",
          }}
          onClick={onClickCallBack}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
