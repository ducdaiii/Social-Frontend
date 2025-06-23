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
import { useSelector } from "react-redux";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../api/userApi";
import { useSendVerificationCodeMutation } from "../../api/mailApi";
import OTPModal from "./OTPModal";
import TextareaField from "./TextareaField";
import InputField from "./InputField";
import SelectField from "./SelectField";
import InfoRow from "./InfoRow";

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
    nickname: "",
    phoneNumber: "",
    gender: "",
    birthDate: "",
    location: "",
    bio: "",
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
      username: user.username || "",
      email: user.email || "",
      socialLinks: user.socialLinks || [],
      background: "",
      avatar: "",
      nickname: user.nickname || "",
      phoneNumber: user.phoneNumber || "",
      gender: user.gender || "",
      birthDate: user.birthDate ? user.birthDate.slice(0, 10) : "",
      location: user.location || "",
      bio: user.bio || "",
      verify: user.verify || false,
    });
    setBackgroundPreview(user.background || "");
    setAvatarPreview(user.avatar || "");
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewLink("");
    setBackgroundPreview("");
    setAvatarPreview("");
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
    const url = URL.createObjectURL(file);
    if (field === "background") setBackgroundPreview(url);
    if (field === "avatar") setAvatarPreview(url);
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
      fd.append("nickname", formData.nickname);
      fd.append("phoneNumber", formData.phoneNumber);
      fd.append("gender", formData.gender);
      fd.append("birthDate", formData.birthDate);
      fd.append("location", formData.location);
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
    <form className="w-full bg-white rounded-2xl border shadow p-6 mx-auto space-y-6 mt-6">
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
                isUpdating
                  ? "bg-green-300"
                  : "bg-green-500 hover:bg-green-600"
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

      {!editing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          <InfoRow label="Username" value={user.username} />
          <InfoRow label="Nickname" value={user.nickname || "N/A"} />
          <InfoRow label="Phone Number" value={user.phoneNumber || "N/A"} />
          <InfoRow label="Gender" value={user.gender || "N/A"} capitalize />
          <InfoRow
            label="Birth Date"
            value={
              user.birthDate
                ? new Date(user.birthDate).toLocaleDateString()
                : "N/A"
            }
          />
          <InfoRow label="Location" value={user.location || "N/A"} />
          <div className="sm:col-span-2">
            <InfoRow label="Bio" value={user.bio || "N/A"} />
          </div>
          <div className="sm:col-span-2">
            <InfoRow label="Email" value={user.email} />
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-500 text-sm">Social Links</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {user.socialLinks?.length > 0 ? (
                user.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-xl"
                  >
                    {renderSocialIcon(link)}
                  </a>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No social links</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <InputField
            label="Username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
          <InputField
            label="Nickname"
            value={formData.nickname}
            onChange={(e) => handleChange("nickname", e.target.value)}
          />
          <InputField
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
          <SelectField
            label="Gender"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            options={[
              { label: "Select Gender", value: "" },
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
          <InputField
            label="Birth Date"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange("birthDate", e.target.value)}
          />
          <InputField
            label="Location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <TextareaField
            label="Bio"
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
          />
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
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
          </div>
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Social Links
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.socialLinks.map((link, idx) => (
                <div key={idx} className="flex items-center space-x-1">
                  {renderSocialIcon(link)}
                  <span className="text-xs text-gray-500 truncate max-w-[150px]">
                    {link}
                  </span>
                </div>
              ))}
            </div>
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
          </div>
        </div>
      )}

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