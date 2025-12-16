// Uses the same styles as Product
import styles from "../Product/Product.module.css";
import Header from "../../components/03-formations/Header/Header.jsx";

export default function Product() {
  return (
      <>
        <Header/>
        <main className={styles.product}>
          <section>
            <div>
              <h2>
                Simple pricing.
                <br />
                Just $9/month.
              </h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
                labore mollitia iusto. Recusandae quos provident, laboriosam fugit
                voluptatem iste.
              </p>
            </div>
            <img src="/public/img-2.jpg" alt="overview of a large city with skyscrapers" />
          </section>
        </main>
      </>
  );
}
