const MessageComponent = ({ message, success }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={`alert ${success ? "alert-success" : "alert-error"}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default MessageComponent;
