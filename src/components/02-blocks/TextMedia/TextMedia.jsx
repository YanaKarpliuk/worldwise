import styles from "./TextMedia.module.scss";

export default function TextMedia({ reversed, text, img, title, imgAlt }) {
  return (
      <div className={`${styles.textMedia} ${reversed ? styles.reversed : ''}`}>
        <div className={styles.textWrapper}>
          <h1>
            {title}
          </h1>
          {text}
        </div>
        <img src={img} alt={imgAlt}/>
      </div>
  )
}
