import React, { useState } from "react";
import Styles from "./login-styles.scss";
import Spinner from "../../components/spinner/spinner";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import Input from "../../components/input/input";
import Context from "../../contexts/form/form-context";

type StateProps = {
  isLoading: boolean;
};
const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
  });

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button className={Styles.submit} type="submit">
            Entrar
          </button>
          <span className={Styles.link}>Criar conta</span>
          <div data-testid="error-wraper" className={Styles.errorWrap}>
            <Spinner className={Styles.spinner} />
            <span className={Styles.error}>Error</span>
          </div>
        </form>
      </Context.Provider>

      <Footer />
    </div>
  );
};

export default Login;
