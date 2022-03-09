import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';

const GET_MOVIE = gql`
  query movieDetails($id: Int!) {
    movieDetails(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    movieSuggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
    // 변수에 그냥 {id}를 쓰면 undefined됨. 이때,
    // useParams()로 값을 받아오면 그 값의 타입은 string이기 때문에
    // +id를 설정해주면 String애서 Integer로 변환해줘야함 OR parseInd(id)
  });
  // console.log(id, loading, data);

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? 'Loading...'
            : `${data.movieDetails.title} ${
                data.movieDetails.isLiked ? '😞' : '💖'
              }`}
        </Title>
        <Subtitle>
          {data?.movieDetails?.language} · {data?.movieDetails?.rating}
        </Subtitle>
        <Description>{data?.movieDetails?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movieDetails?.medium_cover_image}></Poster>
    </Container>
  );
};
