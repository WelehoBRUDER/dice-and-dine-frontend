function Loading() {
  const lang = localStorage.getItem("language") || "en";
  const loadingText = lang === "en" ? "Loading..." : "Ladataan...";
  return <p>{loadingText}</p>;
}

export default Loading;
