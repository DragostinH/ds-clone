const ChatInput = () => {
  return (
    <div className="">
      <div className="">
        <div className="flex items-center space-x-4 px-4 py-2 bg-white">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 border-none outline-none"
          />
          <button className="text-blue-500">Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
