import React from "react";
import styled from "styled-components";
import { Menu, Container, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopIcon = styled(Image).attrs({
  size: "mini",
  src: "https://3.bp.blogspot.com/-KgUzGDeV8r8/VaMOD3z_X-I/AAAAAAAAvh8/YK5LucKKUmo/s800/boy_01.png",
})`
  marginright: 1.5em;
`;
const Component: React.FC<{}> = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item header>
        <Link to="/">
          <TopIcon />
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/bingo">Bingo</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/users">Users</Link>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Component;
