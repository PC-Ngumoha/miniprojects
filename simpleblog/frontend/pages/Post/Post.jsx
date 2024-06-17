import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/Modal/Modal";
import styles from './Post.module.css';
import { request } from '../../config/axios_config';

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  useEffect(() => {
    (async function() {
      try {
        const value = await request.get(`/api/posts/post/${postId}`);
        setPost(value.data.post);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [postId]);

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  return (
    <>
      <section className={ styles.postBody }>
        <img
          src={
            post.thumbnail ||
            import.meta.env.VITE_THUMBNAIL_PLACEHOLDER
          }
          alt="Blog Image" />
        <h1>{ post.title }</h1>
        <div className={ styles.postToolBar }>
          <span className={ styles.date }>
            { formatDate(post.updatedAt) }
          </span>
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
          { post.body }
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