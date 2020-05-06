import React from "react";
import { Menu, Container, Image, Dropdown } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Component: React.FC<{}> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Image size="mini" src="/logo192.png" onClick={() => router.push("/")} />
          </Menu.Item>
          <Menu.Item header>
            <Link href="/">
              <a>MIS BINGO</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/about">
              <a>About</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/bingo">
              <a>Bingo</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/users">
              <a>Users</a>
            </Link>
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
};

export default Component;
