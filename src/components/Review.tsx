import React from 'react';
import styled from 'styled-components/native';
import { Text } from './ui/Text';
import { Star } from '../assets/icon';
import { Review as Props } from '../store/review/types';

export const Review = ({ rating, review, createdAt, author }: Props) => {
  return (
    <Root>
      <Text label={author} fw="500" mb={2} />
      {rating ? (
        <Stars>
          {[...Array(rating)].fill(undefined).map((_, index) => (
            <Star key={index} isActive width={16} height={16} style={{ marginRight: 4 }} />
          ))}
        </Stars>
      ) : null}
      <Text label={review} mb={8} color="#3A3A44" fz={12} />
      <Text label={new Date(createdAt).toLocaleDateString()} color="#3A3A44" fz={12} />
    </Root>
  );
};

const Root = styled.View`
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: #f9f9f9;
  margin-bottom: 16px;
`;

const Stars = styled.View`
  flex-direction: row;
  margin-bottom: 13px;
`;
