import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import ComposeButton from "../../components/ComposeButton/ComposeButton";
import NextButton from "../../components/NextButton/NextButton";
import { request } from '../../config/axios_config';

export default function Home() {
  const placeholder =
  'https://placehold.jp/30/808080/ffffff/300x150.png?text=SimpleBlog';
  const [posts, setPosts] = useState([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    (async function() {
      try {
        const value = await request.get('/api/posts/', {
          params: {start}
        });
        setPosts(value.data.posts);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [ start ]);

  const nextPage = () => {setStart(start + 5)};
  const prevPage = () => {setStart(start - 5)};


  return (
   <>
      {
        posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            thumbnail={
              post.thumbnail ||
              placeholder}
            body={post.body}
          />
        ))
      }
      <ComposeButton />
      { start > 0 && (
        <NextButton displayText='Prev'handleClick={prevPage}/>
      )}
      { posts.length === 5 && (
        <NextButton displayText='Next' handleClick={nextPage}/>
      )}
   </>
  );
}
