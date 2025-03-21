const AuthLogo = ({ user, isLoading, error }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading user</p>}

      {user ? (
        <>
          <img
            src={user.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        </>
      ) : (
        <p className="text-gray-400">Not logged in</p>
      )}
    </div>
  );
};

export default AuthLogo;
