import Header from "../../components/03-formations/Header/Header.jsx";
import Main from "../../components/03-formations/Main/Main.jsx";
import Section from "../../components/03-formations/Section/Section.jsx";
import NotFoundBlock from "../../components/02-blocks/NotFound/NotFound.jsx";

export default function NotFound() {
  return (
      <>
        <Header/>
        <Main>
          <Section isBanner={true}>
            <NotFoundBlock/>
          </Section>
        </Main>
      </>
  );
}
