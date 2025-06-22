import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaRedditAlien,
  FaStackOverflow,
} from "react-icons/fa";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../api/userApi";
import { useSendVerificationCodeMutation } from "../../api/mailApi";
import { useSelector } from "react-redux";
import OTPModal from "./OTPModal";

const renderSocialIcon = (url) => {
  if (url.includes("facebook.com")) return <FaFacebookF />;
  if (url.includes("linkedin.com")) return <FaLinkedinIn />;
  if (url.includes("github.com")) return <FaGithub />;
  if (url.includes("x.com")) return <FaTwitter />;
  if (url.includes("instagram.com")) return <FaInstagram />;
  if (url.includes("youtube.com")) return <FaYoutube />;
  if (url.includes("tiktok.com")) return <FaTiktok />;
  if (url.includes("pinterest.com")) return <FaPinterestP />;
  if (url.includes("reddit.com")) return <FaRedditAlien />;
  if (url.includes("stackoverflow.com")) return <FaStackOverflow />;
  return null;
};

const getSocialType = (url) => {
  if (url.includes("facebook.com")) return "facebook";
  if (url.includes("linkedin.com")) return "linkedin";
  if (url.includes("github.com")) return "github";
  if (url.includes("x.com")) return "twitter";
  if (url.includes("instagram.com")) return "instagram";
  if (url.includes("youtube.com")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("pinterest.com")) return "pinterest";
  if (url.includes("reddit.com")) return "reddit";
  if (url.includes("stackoverflow.com")) return "stackoverflow";
  return null;
};

const UserProfileForm = ({ id }) => {
  const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [sendCode] = useSendVerificationCodeMutation();
  const currentUser = useSelector((state) => state.auth.userInfo);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    socialLinks: [],
    background: "",
    avatar: "",
    verify: false,
  });
  const [newLink, setNewLink] = useState("");
  const [backgroundPreview, setBackgroundPreview] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [showOTP, setShowOTP] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const canEdit = currentUser?._id === user?._id;

  const handleStartEdit = () => {
    setFormData({
      username: user.username,
      email: user.email,
      socialLinks: user.socialLinks || [],
      background: "",
      bio: user.bio || "",
      avatar: "",
      verify: false,
    });
    setBackgroundPreview(user.background);
    setAvatarPreview(user.avatar);
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewLink("");
    setBackgroundPreview("");
    setAvatarPreview("");
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      const type = getSocialType(newLink.trim());
      if (!type) {
        alert("Không hỗ trợ link này");
        return;
      }
      const filtered = formData.socialLinks.filter(
        (link) => getSocialType(link) !== type
      );
      setFormData({
        ...formData,
        socialLinks: [...filtered, newLink.trim()],
      });
      setNewLink("");
    }
  };

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
    const url = URL.createObjectURL(file);
    if (field === "background") setBackgroundPreview(url);
    if (field === "avatar") setAvatarPreview(url);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSendVerification = async () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    await sendCode({ to: formData.email, code }).unwrap();
    setShowOTP(true);
  };

  const handleVerified = () => {
    setFormData({ ...formData, verify: true });
    setShowOTP(false);
  };

  const handleSave = async () => {
    try {
      const fd = new FormData();
      fd.append("username", formData.username);
      fd.append("email", formData.email);
      fd.append("bio", formData.bio);
      if (formData.verify) fd.append("verify", true);
      formData.socialLinks.forEach((link, i) => {
        fd.append(`socialLinks[${i}]`, link);
      });
      if (formData.background) fd.append("background", formData.background);
      if (formData.avatar) fd.append("avatar", formData.avatar);

      await updateUser({ id: user._id, data: fd }).unwrap();
      setEditing(false);
      refetch();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed! Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !user) return <p>Error loading user data</p>;

  return (
    <form className="w-full bg-white rounded-2xl border-2 shadow-md p-6 space-y-5 mt-6 mx-auto">
      <div className="flex justify-end">
        {canEdit && !editing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            Edit
          </button>
        )}
        {canEdit && editing && (
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={isUpdating}
              className={`px-4 py-1.5 text-sm rounded-full shadow transition ${
                isUpdating ? "bg-green-300" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {isUpdating ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-1.5 text-sm bg-gray-300 text-gray-700 rounded-full shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Username
        </label>
        {editing ? (
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p className="text-sm text-gray-900">{user.username}</p>
        )}
      </div>

      {/** 🔥 BIO */}
      {(user.bio || editing) && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Bio
          </label>
          {editing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          ) : (
            <p className="text-sm text-gray-900">
              {user.bio || "No bio provided"}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        {editing && !user.verify ? (
          <div className="flex space-x-2">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleSendVerification}
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Verification
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-900">{user.email}</p>
        )}
      </div>

      {editing && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Background
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange("background", e.target.files[0])
              }
              className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm"
            />
            {backgroundPreview && (
              <img
                src={backgroundPreview}
                alt="Background Preview"
                className="w-full h-48 object-cover rounded-lg shadow mt-2"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange("avatar", e.target.files[0])}
              className="w-full border rounded-lg px-4 py-2 text-sm shadow-sm"
            />
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border shadow mt-2"
              />
            )}
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Social Links
        </label>
        <div className="flex flex-wrap gap-3">
          {(editing ? formData.socialLinks : user.socialLinks || []).map(
            (link, idx) => (
              <div key={idx} className="group">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-xl"
                >
                  {renderSocialIcon(link) || (
                    <span className="text-xs text-gray-400">Link</span>
                  )}
                </a>
                {editing && (
                  <span className="text-xs text-gray-500 block max-w-[200px] truncate">
                    {link}
                  </span>
                )}
              </div>
            )
          )}
        </div>
        {editing && (
          <div className="mt-2 flex space-x-2">
            <input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              type="url"
              placeholder="https://"
              className="flex-1 border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {showOTP && (
        <OTPModal
          code={generatedCode}
          onVerified={handleVerified}
          onClose={() => setShowOTP(false)}
        />
      )}
    </form>
  );
};

export default UserProfileForm;
