import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";

import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  console.log(selectedUser);
  return (
    <div className="h-screen bg-base-200 ">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-base-100 rounded-xl shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] ">
          <div className="flex h-full overflow-hidden">
            
            <Sidebar />
           
          
            {!selectedUser ? <NoChatSelected/> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;