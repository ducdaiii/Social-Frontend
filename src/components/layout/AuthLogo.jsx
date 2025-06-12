import PropTypes from "prop-types";

const AuthLogo = ({ user, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex items-center text-sm text-gray-400">
        Loading user...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center text-sm text-red-500">
        Failed to load user
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center text-sm text-gray-400">
        Not logged in
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white font-medium text-lg">{(user?.username || "?").toString().toUpperCase()}</span>
      <img
        src={user.avatar || "/default-avatar.png"}
        alt={`${user.username}'s avatar`}
        className="h-10 w-10 rounded-full object-cover"
      />
    </div>
  );
};

AuthLogo.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  error: PropTypes.any,
};

export default AuthLogo;
