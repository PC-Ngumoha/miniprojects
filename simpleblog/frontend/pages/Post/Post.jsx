import { useParams } from "react-router-dom";

export default function Post() {
  const { postId } = useParams();

  return (
    <h1>The full blog detail page for post #{ postId }</h1>
  );
}