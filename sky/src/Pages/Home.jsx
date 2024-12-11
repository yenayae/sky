import NavBar from "../Components/NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../Styles/contactButton.css";

const Content = styled.div`
  // background-color: pink;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;

const Gif = styled.img`
  width: 100px;
  height: 100px;
`;

const Container = styled.div`
  background-color: white;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p`
  text-align: center;
  color: grey;
`;

const Divider = styled.hr`
  width: 100%;
`;

const Home = () => {
  useState(() => {
    document.title = "Home Page";
  }, []);

  return (
    <div>
      <NavBar></NavBar>

      <Content>
        <Container>
          <Gif
            src="img/assets/cry.gif
          "
            alt="crying gif"
          />

          <Paragraph>
            hi there! i'm struggling alot with figuring out the ui for this
            page.... please leave behind any suggestions below! i'm open to any
            criticism, for all parts of this website!!!
          </Paragraph>

          <Divider />

          <Paragraph>
            this website is a work in progress. it's a letterboxed version for
            game{" "}
            <a className="sky-link" href="https://www.thatskygame.com/">
              sky:children of the light
            </a>{" "}
            from thatgamecompany! cosmetics are a huge part of this game,
            however there isn't a good catalog of them online besides the wiki
            (which tends to get laggy and slow). this website is for players to
            research about cosmetics they'd like, ask other players to do outfit
            requests, or simply look for inspiration!
          </Paragraph>

          <Link to="/contact">
            <button className="contact-button">contact me!!!</button>
          </Link>
        </Container>
      </Content>
    </div>
  );
};

export default Home;
