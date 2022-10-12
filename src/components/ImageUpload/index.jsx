import React from 'react';

import s from './ImageUpload.module.scss';

function ImageUpload({ url, setValues, setImage }) {
  const clearImage = () => {
    setValues((prev) => {
      return {
        ...prev,
        imageUrl: '',
      };
    });
    setImage(false);
  };

  const onChangeFile = (e) => {
    var fr = new FileReader();
    fr.onload = function () {
      // setImageUrl(fr.result)
      setValues((prev) => {
        return {
          ...prev,
          imageUrl: fr.result,
        };
      });
    };
    fr.readAsDataURL(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className={s.file}>
      {url.length > 0 ? (
        <>
          <div div className={s.wrapper}>
            <img src={url} alt="" />
          </div>
          <div onClick={clearImage} className={s.form__file_reset}></div>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M3 5a3 3 0 0 1 3-3h8a7 7 0 0 1 7 7v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V5Zm10-1H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9h-6V4Zm5.584 3A5.009 5.009 0 0 0 15 4.1V7h3.584Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            onChange={onChangeFile}
            type="file"
            id="imageUrl"
            className="form__item_load"
          />
        </>
      )}
    </div>
  );
}

export default ImageUpload;
