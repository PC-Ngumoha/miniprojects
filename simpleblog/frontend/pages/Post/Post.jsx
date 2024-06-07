// import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from './Post.module.css';

export default function Post() {
  // const { postId } = useParams();

  return (
    <section className={ styles.postBody }>
      <img src="https://i.ibb.co/XsFQq36/baggy-brown.jpg" alt="Blog Image" />
      <h1>Blog Title</h1>
      <div className={ styles.postToolBar }>
        <span className={ styles.date }>Feb 27, 2024</span>
        <span>
          <FontAwesomeIcon icon={faPencil} />
        </span>
        <span>
          <FontAwesomeIcon icon={faTrash} />
        </span>
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Est recusandae fugiat ratione praesentium perspiciatis reiciendis
        labore nemo quo quos quaerat? Id dolorem aliquid sapiente vitae
        eligendi est itaque quo nisi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Earum ab exercitationem temporibus veritatis
        officiis obcaecati quam consectetur iusto aliquam.
        Totam dicta eos quasi dolorem tempora. Fuga nihil recusandae
        sunt dolore.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Est recusandae fugiat ratione praesentium perspiciatis reiciendis
        labore nemo quo quos quaerat? Id dolorem aliquid sapiente vitae
        eligendi est itaque quo nisi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Earum ab exercitationem temporibus veritatis
        officiis obcaecati quam consectetur iusto aliquam.
        Totam dicta eos quasi dolorem tempora. Fuga nihil recusandae
        sunt dolore.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Est recusandae fugiat ratione praesentium perspiciatis reiciendis
        labore nemo quo quos quaerat? Id dolorem aliquid sapiente vitae
        eligendi est itaque quo nisi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Earum ab exercitationem temporibus veritatis
        officiis obcaecati quam consectetur iusto aliquam.
        Totam dicta eos quasi dolorem tempora. Fuga nihil recusandae
        sunt dolore.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Est recusandae fugiat ratione praesentium perspiciatis reiciendis
        labore nemo quo quos quaerat? Id dolorem aliquid sapiente vitae
        eligendi est itaque quo nisi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Earum ab exercitationem temporibus veritatis
        officiis obcaecati quam consectetur iusto aliquam.
        Totam dicta eos quasi dolorem tempora. Fuga nihil recusandae
        sunt dolore.

        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Est recusandae fugiat ratione praesentium perspiciatis reiciendis
        labore nemo quo quos quaerat? Id dolorem aliquid sapiente vitae
        eligendi est itaque quo nisi. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Earum ab exercitationem temporibus veritatis
        officiis obcaecati quam consectetur iusto aliquam.
        Totam dicta eos quasi dolorem tempora. Fuga nihil recusandae
        sunt dolore.
      </p>
    </section>
  );
}