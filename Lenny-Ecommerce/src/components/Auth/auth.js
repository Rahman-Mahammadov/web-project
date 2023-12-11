export const userStored = ({ data }) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      email: data.user.email,
      username: data.user.username,
      jwt: data.jwt,
      userId:data.user.id,
    })
  );
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user");
  if (stringifiedUser) {
    return JSON.parse(stringifiedUser);
  }
};
