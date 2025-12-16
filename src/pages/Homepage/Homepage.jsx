import Header from "../../components/03-formations/Header/Header.jsx";
import Main from "../../components/03-formations/Main/Main";
import Section from "../../components/03-formations/Section/Section";
import Banner from "../../components/02-blocks/Banner/Banner";

export default function Homepage() {
  return (
      <>
        <Header/>
        <Main>
          <Section isBanner={true} bgImage={true} narrow={true}>
            <Banner/>
          </Section>
        </Main>
      </>
  );
}
