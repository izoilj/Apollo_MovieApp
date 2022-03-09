import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Movie from '../components/Movie';
import styled from 'styled-components';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const Header = styled.div`
  width: 100vw;
  height: 40vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  padding: 2rem;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Loading = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: grey;
  margin-top: 5em;
`;

// #1
// export default () => {
//   const { loading, error, data } = useQuery(GET_MOVIES);
//   // console.log(loading, error, data);
//   if (loading) {
//     return 'Loaging...';
//   }
//   if (data && data.movies) {
//     return data.movies.map((m) => <div>{m.id}</div>);
//   }
// };

// #2

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo 2022</Title>
        <SubTitle>I love GraphQL</SubTitle>
      </Header>
      <Main>
        {loading && <Loading>Loading...</Loading>}
        {!loading &&
          data.movies &&
          data.movies.map((m) => <Movie key={m.id} id={m.id} />)}
      </Main>
    </Container>
  );
};
