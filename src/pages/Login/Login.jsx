import { useEffect, useState } from "react";
import Header from "../../components/03-formations/Header/Header.jsx";
import Section from "../../components/03-formations/Section/Section.jsx";
import Main from "../../components/03-formations/Main/Main.jsx";
import Form from "../../components/00-elements/Form/Form.jsx";
import Button from "../../components/00-elements/Button/Button";
import { useAuth } from "../../contexts/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (email && password) {
      login(email, password)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true })
    }
  }, [isAuthenticated])

  return (
      <>
        <Header/>
        <Main>
          <Section isBanner={true} narrow={true}>
            <Form handleSubmit={handleSubmit}>
              <div className='row'>
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
              </div>

              <div className='row'>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
              </div>

              <Button ariaLabel='Log in' type='primary'>
                Log in
              </Button>
            </Form>
          </Section>
        </Main>
      </>
  );
}
