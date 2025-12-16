import styles from "./Homepage.module.scss";
import { Link } from "react-router-dom";
import Header from "../../components/03-formations/Header/Header.jsx";

export default function Homepage() {
  return (
      <>
        <Header/>
        <main>
          <section className={styles.homepage}>
            <div className="container narrow">
              <h1>
                You travel the world.
                <br/>
                WorldWise keeps track of your adventures.
              </h1>
              <div className={styles.text}>
                A world map that tracks your footsteps into every city you can think
                of. Never forget your wonderful experiences, and show your friends how
                you have wandered the world.
              </div>
              <Link to="/app" className="cta">Start tracking now</Link>
            </div>
          </section>
        </main>
      </>
  );
}
