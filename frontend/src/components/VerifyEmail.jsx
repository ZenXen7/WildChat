import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";


const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const { verifyEmail } = useAuthStore();

  const handleVerify = async () => {
    await verifyEmail(code);
  };

  return (
    <div className="p-4">
     <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Verification Code</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full pl-10 h-12"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
         onClick={handleVerify}
                  type="submit"
                  className="btn btn-primary w-full h-12 mt-4 text-lg font-bold"
                  
                >
                 Verify Code
                </button>
     </div>
    </div>
  );
};


export default VerifyEmail;
