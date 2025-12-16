import styles from "./Section.module.scss";

export default function Section({isBanner, bgImage, narrow, children}) {
  return (
      <section className={`${styles.section} ${isBanner && 'banner'} ${bgImage && 'bg'}`}>
        <div className={`container ${narrow && 'narrow'}`}>
          {children}
        </div>
      </section>
  )
}
