import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"



const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser} = useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if(isMessagesLoading) return <div>Loading...</div>

  
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>

      <MessageInput/>      
    </div>
  )
}

export default ChatContainer
