import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10 px-4">
      <div className="max-w-3xl w-full bg-base-100 border-b rounded-xl p-8">
        <h1 className="text-3xl font-bold tracking-tight font-poppins">Profile</h1>
      

        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="relative group">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-36 rounded-full object-cover border-4 border-base-300 shadow-lg transition-all duration-300 hover:scale-105"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-2 right-2 bg-base-content p-2 rounded-full cursor-pointer transition-all duration-200 shadow-md group-hover:scale-110 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <Camera className="w-6 h-6 text-base-100" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-500">{isUpdatingProfile ? "Uploading..." : ""}</p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-sm  text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" /> Full Name
            </label>
            <p className="mt-1 px-4 py-3 bg-base-200 rounded-lg border text-base-content">{authUser?.fullName}</p>
          </div>

          <div>
            <label className="text-sm  text-zinc-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Address
            </label>
            <p className="mt-1 px-4 py-3 bg-base-200 rounded-lg border text-base-content">{authUser?.email}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-base-300 rounded-xl">
          <h2 className="text-lg font-semibold mb-4 text-base-content">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span className="text-zinc-400">Member Since</span>
              <span className="font-medium">{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-zinc-400">Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
