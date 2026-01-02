import Header from "../../components/03-formations/Header/Header.jsx";
import Main from "../../components/03-formations/Main/Main.jsx";
import Section from "../../components/03-formations/Section/Section.jsx";
import TextMedia from "../../components/02-blocks/TextMedia/TextMedia.jsx";

export default function Product() {
  return (
      <>
        <Header/>
        <Main>
          <Section isBanner={true}>
            <TextMedia
                reversed={true}
                title={"About WorldWide."}
                text={
                  <>
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
                  </>
                }
                img={"/public/img-1.jpg"}
                imgAlt={"person with dog overlooking mountain with sunset"}
            />
          </Section>
        </Main>
      </>
  );
}
