import axios from "axios";
import { useState, useEffect } from "react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setArticles(res.data))
      .catch(() => setError("An error occured, please try again later"));
  }, []);

  return (
    <>
      {error && <p>An error occured, please try again later</p>}
      {articles.map((a) => (
        <div key={a.id}>{a.title}</div>
      ))}
    </>
  );
}
