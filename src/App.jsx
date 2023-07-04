import './App.css'
import Body from './components/Body';
import Header from './components/Header'

import styled from 'styled-components';


const AppContainer = styled.div`
  height: 100%;
  min-height: 680px;
  width: 100%;
  max-width: 400px;
  background-color: rgb(27, 28, 72);
  border-radius: 20px;
  margin: 6vh auto;
  color: white;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Main>
        <Body />
      </Main>
    </AppContainer>
  )
}

export default App;
