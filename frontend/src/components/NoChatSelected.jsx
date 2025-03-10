import {  Cat } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center border border-base-300 rounded-xl justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
    
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-amber-300 flex items-center
             justify-center animate-bounce"
            >
              <Cat className="w-8 h-8 text-red-800 " />
            </div>
          </div>
        </div>

   
        <h2 className="text-2xl font-bold">Welcome to kChat!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;