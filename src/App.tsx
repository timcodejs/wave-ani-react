import styled from '@emotion/styled';
import Line from 'components/Line';

function App() {
  return (
    <AppStyled>
      <Line />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  margin: 0;
  padding: 0;
  background-color: #000;
`;

export default App;
