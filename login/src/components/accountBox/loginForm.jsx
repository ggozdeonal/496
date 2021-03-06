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

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Şifre" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Şifremi unuttum!</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Giriş</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Üyeliğinizi yoksa {" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Kaydol!
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
