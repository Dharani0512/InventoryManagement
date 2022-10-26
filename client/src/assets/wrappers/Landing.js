import styled from "styled-components";
const img = require("../images/hero.jpg").default;

const image = img;
const Wrapper = styled.body`
  /* background-color: rgb(99, 151, 166); */

  /*
COLORS:

Light green: #7ed56f
Medium green: #55c57a
Dark green: #28b485

*/
  :root {
    --light-green: rgba(126, 213, 111, 0.8);
    --Dark-green: rgba(40, 180, 133, 0.8);
    --white: #fff;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Lato" sans-serif;
    font-weight: 400;
    line-height: 1.7;
    font-size: 16px;
    color: #777;
    padding: 30px;
  }

  .header .logo-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .logo {
    height: 2.5rem;
  }

  .heading-center {
    position: absolute;
    top: 40%;
    left: 50%;
  }

  .heading-primary {
    color: var(--white);
    transform: translate(-50%, -50%);
    /* to avoid the shaking in animation your backface-visiblity : hidden */
    backface-visibility: hidden;
    text-align: center;
  }

  .heading-primary-main {
    display: block;
    text-transform: uppercase;
    letter-spacing: 35px;
    font-size: 60px;
    font-weight: 400;
    animation: moveInleft 1s ease-out;
  }

  .heading-primary-sub {
    display: block;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 17.5px;
    animation: moveInRight 1s ease-out;
    margin-bottom: 3rem;
  }

  @keyframes moveInleft {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    80% {
      transform: translateX(10px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    80% {
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translate(0);
    }
  }

  .btn:link,
  .btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 100px;
    transition: all 0.2s;
    position: relative;
  }

  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* when the button is clicked */
  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  .btn-white {
    background-color: var(--white);
    color: #777;
  }

  .btn::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s;
  }

  .btn-white::after {
    background-color: var(--white);
  }

  .btn:hover::after {
    transform: scaleX(1.4), scaleY(1.6);
    opacity: 0;
  }

  .btn-animated {
    animation: moveInBottom 0.5s ease-out;
    animation-fill-mode: backwards;
  }

  .btn-slide::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    width: 100%;
    height: 100%;
    border-radius: 100px;
    z-index: -1;
  }

  .btn-slide-red {
    background-color: red;
  }
  .arrange-logo {
    display: flex;
    flex-direction: column;
  }
`;

export default Wrapper;
