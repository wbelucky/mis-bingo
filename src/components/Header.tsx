import React from "react";
import styled from "styled-components";
import { Menu, Container, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import url from "../../public/logo192.png";

const TopIcon = styled(Image).attrs({
  size: "mini",
  src: url,
})``;
const Component: React.FC<{}> = ({ children }) => (
  <>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <Link to="/">
            <TopIcon />
          </Link>
        </Menu.Item>
        <Menu.Item header>
          <Link to="/">MIS BINGO</Link>
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
        <Menu.Item position="right">
          <Dropdown text={"TODO: name"} icon="user" labeled button className="icon">
            <Dropdown.Menu>
              <Dropdown.Item icon="setting" text="Settings" />
              <Dropdown.Item icon="trophy" content="Achievements" />
              <Dropdown.Divider />
              <Dropdown.Item icon="logout" text="Log Out" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
    <Container style={{ marginTop: "5em" }}>{children}</Container>
  </>
);

export default Component;
