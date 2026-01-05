import Header from "../../components/03-formations/Header/Header.jsx";
import Main from "../../components/03-formations/Main/Main.jsx";
import Section from "../../components/03-formations/Section/Section.jsx";
import TextMedia from "../../components/02-blocks/TextMedia/TextMedia";

export default function Product() {
  return (
      <>
        <Header/>
        <Main>
          <Section isBanner={true}>
            <TextMedia
                text={<p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
                  labore mollitia iusto. Recusandae quos provident, laboriosam fugit
                  voluptatem iste.
                </p>}
                title={<>Simple pricing.
                  <br/>
                  Just $9/month.</>}
                img={"/img-2.jpg"}
                imgAlt={"overview of a large city with skyscrapers"}
            />
          </Section>
        </Main>
      </>
  );
}
