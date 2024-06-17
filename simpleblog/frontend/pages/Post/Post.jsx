import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from '@chakra-ui/react';
import Modal from "../../components/Modal/Modal";
import styles from './Post.module.css';
import { request } from '../../config/axios_config';

export default function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const toast = useToast();

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
            <button className={ styles.yes } onClick={() => {
              (async function() {
                try {
                  await request.delete(`/api/posts/post/${postId}`);
                  navigate('/', {replace: true});
                  toast({
                    title: 'Successful !',
                    description: 'Post successfully deleted',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                  });
                } catch(err) {
                  toast({
                    title: 'Error !',
                    description: 'Post not deleted successfully',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                  });
                }
              })();
            }}>
              Yes
            </button>
            <button className={ styles.no } onClick={handleClose}>
              No
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
}