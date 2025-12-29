import styles from './Main.module.scss'

export default function Main({full = true, children}) {
  return (
      <main className={`${styles.main} ${full ? styles.full : '' }`}>
        {children}
      </main>
  )
}
