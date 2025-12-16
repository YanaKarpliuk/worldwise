import styles from "./Product.module.css";
import Header from "../../components/03-formations/Header/Header.jsx";

export default function Product() {
  return (
      <>
        <Header/>
        <main className={styles.product}>
          <section>
            <img
                src="/public/img-1.jpg"
                alt="person with dog overlooking mountain with sunset"
            />
            <div>
              <h2>About WorldWide.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
                dicta illum vero culpa cum quaerat architecto sapiente eius non
                soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
                perspiciatis?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
                doloribus libero sunt expedita ratione iusto, magni, id sapiente
                sequi officiis et.
              </p>
            </div>
          </section>
        </main>
      </>
  );
}
