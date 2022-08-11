import styled from 'styled-components';
import Form from './Form';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;
const Description = styled.div``;

function Home() {
  return (
    <Container>
      <Description>
        <h1>Verifikasi Data Warga</h1>
      </Description>
      <Form />
    </Container>
  );
}

export default Home;
