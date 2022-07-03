import styled from 'styled-components';

export const Nav = styled.ul`
list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

export const NavElement = styled.li`
float: left;
`;

export const NavLink = styled.a`
display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  &:hover {
    background-color: #111;
  }
`;

