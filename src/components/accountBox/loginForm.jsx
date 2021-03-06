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
import { FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
// import {MyFacebookLoginButton} from "../socialMediaButton";
//import {createButton} from "react-social-login-buttons";

/* const configfb = {
  text: "Facebook ile giriş yapın.",
  icon: createSvgIcon(svgIcon),
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};
/** My Facebook login button. 
const MyFacebookLoginButton = createButton(configfb);

const configGoogle = {
  text: "Google ile giriş yapın.",
  icon: createSvgIcon(svgIcon),
  iconFormat: name => `fa fa-${name}`,
  style: { background: "#3b5998" },
  activeStyle: { background: "#293e69" }
};
/** My Facebook login button. 
const MyGoogleLoginButton = createButton(configGoogle); */

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
      <Marginer direction="vertical" margin="1em" />
      <FacebookLoginButton />
      <GoogleLoginButton/>
    </BoxContainer>
  );
}
