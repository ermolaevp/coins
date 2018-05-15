import * as React from 'react';
import styled from 'styled-components';
import QuotesButton from './quotes-button';

const Header = () => (
  <StyledHeader>
    <Brand>Coins</Brand>
    <QuotesButton />
  </StyledHeader>
);

const Brand = styled.div`
  font-size: 24px;
`;

const StyledHeader = styled.header`
  height: 80px;
  padding: 16px 36px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(224, 224, 224);
  justify-content: space-between;
  background-color: white;
`;

export default Header;
