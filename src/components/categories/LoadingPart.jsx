import ReactLoading from "react-loading";

function LoadingPart() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading
        id="loading-style"
        type="spin"
        color="#80B3FF"
        height={"20%"}
        width={"20%"}
      />
    </div>
  );
}

export default LoadingPart;
