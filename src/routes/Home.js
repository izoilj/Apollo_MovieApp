import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Movie from '../components/Movie';
import styled from 'styled-components';

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIES);

  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map((m) => (
          <Movie
            key={m.id}
            id={m.id}
            isLiked={m.isLiked}
            bg={m.medium_cover_image}
          />
        ))}
      </Movies>
    </Container>
  );
};

// cache -> 한번 id를 클릭해서 details 페이지로갔다가 뒤로가기 후에 다시 같은 id를 클릭하면,
//  로딩페이지가 뜨지 않는다. 그 이유는 graphql은 내가했던걸 캐쉬?저장? 암튼 그래서
//  다시 리퀘스트할 필요가 없게 하기 때문
