export const useAuth = () => {
  const data = JSON.parse(localStorage.getItem("data"));
  const token = data?.token;
  const username = data?.username;
  const role = data?.role;

  return { token, username, role };
};
