import React from "react";

const FormHome = ({ user }) => {
  return (
    <div>
      <h2>Bienvenido, {user.name}</h2>
    </div>
  );
};

export default FormHome;
