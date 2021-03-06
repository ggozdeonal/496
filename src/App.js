import "./App.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import img from './img/background.jpg';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderImg = styled.div`
  background-image: url(${img});
  background-position:center;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: repeat;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

function App() {

  
  return (
    <HeaderImg>
      <AppContainer>
        <AccountBox />
      </AppContainer>
    </HeaderImg>
    
  );
}

export default App;
