import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import { request } from '../../config/axios_config';
import styles from './Compose.module.css';

export default function Compose() {
  const [image, setImage] = useState();
  const [fileName, setFileName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const createPost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('thumbnail', image);

    try {
      await request.post('/api/posts/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      navigate('/', { replace: true });
      toast({
        title: 'Success !',
        description: 'Created post successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (err) {
      toast({
        title: 'Error !',
        description: 'Could not create post',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <form className={ styles.formArea } onSubmit={(evt) => {
      evt.preventDefault();
      createPost();
    }}>
      <ImageUpload
        image={image}
        fileName={fileName || 'Image'}
        setImage={setImage}
        setFileName={setFileName}
      />

      <div>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" value={title} onChange={
          (evt) => setTitle(evt.target.value)
        }/>
      </div>

      <div>
        <label htmlFor="body">Body: </label>
        <textarea id="body" value={body} onChange={
          (evt) => setBody(evt.target.value)
        }></textarea>
      </div>

      <div>
        <button className={ styles.submitButton }>
          Post
        </button>
      </div>

    </form>
  );
}
