import { Message } from "@prisma/client";
import { FieldValues, useForm } from "react-hook-form";

interface ChatViewProps {
  userConversation: any;
}

const ChatView = ({ userConversation }: ChatViewProps) => {
  // use react-hook forms

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  return (
    <div
      className="chatContent_
      min-w-0 min-h-0 flex-auto flex flex-row justify-stretch items-stretch relative
    ">
      <main className="mainContent_ relative flex flex-col min-h-0 min-w-0 flex-auto">
        <div className="messageWrapper_ relative flex flex-auto min-h-0 min-w-0 z-0">
          <div className="scroller_ absolute top-0 left-0 right-0 bottom-0 overflow-y-scroll overflow-x-hidden min-h-0 flex-auto">
            <div className="conversationContent_ flex flex-col justify-end items-stretch min-h-full">
              <ol className="messageList_ min-h-0 overflow-hidden list-none">
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
                <li>msg</li>
              </ol>
            </div>
          </div>
        </div>
        <form
          action=""
          className="messageForm_ relative shrink-0 px-4 -mt-2">
          <div className="bottomBarArea_ flex flex-row">
            <div className="textArea_ mb-6 relative w-full indent-0 rounded-lg">
              <div className="scrollableContainer_ overflow-x-hidden overflow-y-scroll max-h-[50vh] ">
                <div className="inner_ pl-4 flex relative gap-4">
                  <div className="messageInput_ flex-auto flex flex-row items-center">
                    <textarea
                      placeholder="Type a message"
                      className="input_ flex-auto text-wrap w-full px-4 py-2 rounded-lg bg-gray-100 resize-none"
                      {...register("message", { required: true })}
                      rows={1}
                      onInput={(e) => {
                        e.currentTarget.style.height = "auto";
                        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                      }}
                    />
                  </div>
                  <div className="sendButton_ flex flex-row items-end">
                    <button
                      type="submit"
                      className="button_ px-4 py-2 rounded-lg bg-blue-500 text-white">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
export default ChatView;
