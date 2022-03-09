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
      description_intro
    }
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const DetailsHeader = styled.div`
  width: 100vw;
  height: 5vh;
  background: #000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailsTop = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 2rem;
`;

const DetailsMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DetailsLoading = styled.div`
  font-size: 2.5rem;
  font-weight: 600;
  color: grey;
  margin-top: 15em; //중간정렬 어떻게했더라..
`;

const DetailsContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5em;
  width: 80vw;
`;

const DetailsImg = styled.img``;

const DetailsTitle = styled.div`
  font-size: 25px;
  font-weight: 600;
  margin-top: 3em;
`;

const DetailsDesc = styled.div`
  margin-top: 1.5rem;
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: +id },
    // 변수에 그냥 {id}를 쓰면 undefined됨. 이때,
    // useParams()로 값을 받아오면 그 값의 타입은 string이기 때문에
    // +id를 설정해주면 String애서 Integer로 변환해줘야함
  });
  console.log(id, loading, data);
  return (
    <DetailsContainer>
      <DetailsHeader>
        <DetailsTop>Apollo 2022</DetailsTop>
      </DetailsHeader>
      <DetailsMain>
        {loading && <DetailsLoading>Loading...</DetailsLoading>}
        {!loading && data.movieDetails && (
          <DetailsContents>
            <DetailsImg
              src={data.movieDetails.medium_cover_image}
              alt={data.movieDetails.title}
            />
            <DetailsTitle>{data.movieDetails.title}</DetailsTitle>
            <DetailsDesc>{data.movieDetails.description_intro}</DetailsDesc>
          </DetailsContents>
        )}
      </DetailsMain>
    </DetailsContainer>
  );
};
