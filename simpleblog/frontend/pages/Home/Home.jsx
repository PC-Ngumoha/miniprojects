import Post from "../../components/Post/Post";
import ComposeButton from "../../components/ComposeButton/ComposeButton";
import NextButton from "../../components/NextButton/NextButton";

export default function Home() {
  return (
   <>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <ComposeButton />
      <NextButton displayText='Prev' />
      <NextButton displayText='Next' />
   </>
  );
}
