import { useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal/Modal";
import styles from './Post.module.css';

export default function Post() {
  // const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  return (
    <>
      <section className={ styles.postBody }>
        <img src="https://i.ibb.co/XsFQq36/baggy-brown.jpg" alt="Blog Image" />
        <h1>Blog Title</h1>
        <div className={ styles.postToolBar }>
          <span className={ styles.date }>Feb 27, 2024</span>
          <span onClick={ () => {
            navigate('/compose', {state: {prevPage: location.pathname}})
          }}>
            <FontAwesomeIcon icon={faPencil} />
          </span>
          <span onClick={ handleOpen }>
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
        <Modal open={open} onClose={handleClose}>
          <p>You sure you wanna delete this ?</p>
          <div className={ styles.options }>
            <button className={ styles.yes }>Yes</button>
            <button className={ styles.no }>No</button>
          </div>
        </Modal>
      </section>
    </>
  );
}