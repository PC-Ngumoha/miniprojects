import styles from './Post.module.css';

export default function BlogCard() {
  return (
    <div className={ styles.card }>
      <img src="https://i.ibb.co/XsFQq36/baggy-brown.jpg" alt="baggy-brown" />
      <div className={ styles.details }>
        <h1>Blog Title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eligendi dignissimos aliquam consectetur similique,
          odit itaque ad laudantium ...
        </p>
        <div className={ styles.seeMore }>
          <a href="#">See More</a>
        </div>
      </div>
    </div>
  );
}
