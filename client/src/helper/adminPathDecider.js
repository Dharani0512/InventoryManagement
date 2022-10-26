const adminPathDecider = (baseUrl, userType) => {
  return userType === "Admin" ? `/${baseUrl}` : `/stateAdmin/${baseUrl}`;
};

export default adminPathDecider;
