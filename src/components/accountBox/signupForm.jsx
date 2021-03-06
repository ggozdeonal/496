import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Kullanıcı İsmi" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Şifre" />
        <Input type="password" placeholder="Şifrenizi tekrar girin" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Kayıt Ol</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Zaten bir üyeliğim var!
        <BoldLink href="#" onClick={switchToSignin}>
          Giriş Yap.
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
