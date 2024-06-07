import Post from "../../components/Post/Post";
import ComposeButton from "../../components/ComposeButton/ComposeButton";
import NextButton from "../../components/NextButton/NextButton";

const posts = [
  {
    id: 1,
    title: 'Blog Title',
    thumbnail: 'https://i.ibb.co/XsFQq36/baggy-brown.jpg',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae neque illum possimus sapiente! Velit a ratione fugit inventore quaerat aliquam, ex pariatur vero animi aliquid quidem illo impedit adipisci saepe?'
  },
  {
    id: 2,
    title: 'Blog Title',
    thumbnail: 'https://i.ibb.co/XsFQq36/baggy-brown.jpg',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae neque illum possimus sapiente! Velit a ratione fugit inventore quaerat aliquam, ex pariatur vero animi aliquid quidem illo impedit adipisci saepe?'
  },
  {
    id: 3,
    title: 'Blog Title',
    thumbnail: 'https://i.ibb.co/XsFQq36/baggy-brown.jpg',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae neque illum possimus sapiente! Velit a ratione fugit inventore quaerat aliquam, ex pariatur vero animi aliquid quidem illo impedit adipisci saepe?'
  },
  {
    id: 4,
    title: 'Blog Title',
    thumbnail: 'https://i.ibb.co/XsFQq36/baggy-brown.jpg',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae neque illum possimus sapiente! Velit a ratione fugit inventore quaerat aliquam, ex pariatur vero animi aliquid quidem illo impedit adipisci saepe?'
  },
  {
    id: 5,
    title: 'Blog Title',
    thumbnail: 'https://i.ibb.co/XsFQq36/baggy-brown.jpg',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae neque illum possimus sapiente! Velit a ratione fugit inventore quaerat aliquam, ex pariatur vero animi aliquid quidem illo impedit adipisci saepe?'
  },
]

export default function Home() {
  return (
   <>
      {
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            thumbnail={post.thumbnail}
            body={post.body}
          />
        ))
      }
      <ComposeButton />
      <NextButton displayText='Prev' />
      <NextButton displayText='Next' />
   </>
  );
}
