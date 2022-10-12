import MDEditor from '@uiw/react-md-editor';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Context } from '../../App';
import axios from '../../axios';
import ImageUpload from '../../components/ImageUpload';
import s from './CreatePost.module.scss';

function CreatePost() {
  // ======== current theme
  const { theme } = React.useContext(Context);
  // ======== current theme

  // ======== id edit post
  const { id } = useParams();
  // ======== id edit post

  // ======== navigate
  const navigate = useNavigate();
  // ======== navigate

  // ======== text post
  const [text, setText] = React.useState('');
  // ======== text post

  // ======== input values
  const [values, setValues] = React.useState({
    title: '',
    tags: '',
    imageUrl: '',
  });
  // ======== input values

  // ======== change input values
  function onChangeValues(value, e) {
    setValues((prev) => {
      return {
        ...prev,
        [value]: e.target.value,
      };
    });
  }
  // ======== change input values

  // ======== file image
  const [image, setImage] = React.useState();
  // ======== file image

  // ======== get post data if now efit mod
  const getPost = async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setValues((prev) => {
      return {
        ...prev,
        title: data.title,
        tags: data.tags,
        imageUrl: `http://localhost:4444${data.imageUrl}`,
      };
    });
    setText(data.text);
    setImage(true);
  };

  React.useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);
  // ======== get post data if now efit mod

  // ======== create or edit post submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = false;
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        const { data } = await axios.post('/upload', formData);
        url = data.url;
      }
      await axios.post(
        id
          ? `http://localhost:4444/posts/${id}/update`
          : 'http://localhost:4444/posts',
        {
          ...values,
          imageUrl: url ? url : '/uploads/default.jpg',
          text: text,
          tags:
            Array.isArray(values.tags) > 0
              ? values.tags
              : values.tags.split(' '),
        },
      );
      navigate('/posts/all');
    } catch (e) {
      console.error(e);
    }
  };
  // ======== create or edit post submit

  return (
    <div className={'container'}>
      <div className={s.wrapper}>
        <form className={s.form}>
          <h1 className={s.title}>Создание записи</h1>
          <ImageUpload
            url={values.imageUrl}
            setValues={setValues}
            setImage={setImage}
          />
          <div className={s.form__item}>
            <label htmlFor="title">Название</label>
            <input
              id="title"
              type="text"
              className={s.form__input}
              placeholder="Введите название"
              value={values.title}
              onChange={(e) => onChangeValues('title', e)}
            />
          </div>
          <div className={s.form__item}>
            <label htmlFor="tags">Теги</label>
            <input
              id="tags"
              type="text"
              className={s.form__input}
              placeholder="Введите теги"
              value={values.tags}
              onChange={(e) => onChangeValues('tags', e)}
            />
          </div>
          <div id="editor" className={s.form__item}>
            <MDEditor
              value={text}
              onChange={setText}
              className={s.markdown}
              components={{
                preview: (source, state, dispath) => {
                  return (
                    <div>
                      <MDEditor.Markdown
                        source={source}
                        className={s.markdown}
                      />
                    </div>
                  );
                },
              }}
            />
          </div>
          <button onClick={onSubmit} className={s.form__submit}>
            Создать
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
