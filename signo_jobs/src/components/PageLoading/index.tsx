import React from "react";

export default function PageLoading() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "83vh",
      }}
    >
      <h1 className="text-center text-white">Carregando...</h1>
    </div>
  );
}
