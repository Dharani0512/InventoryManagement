import styled from "styled-components";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      /* background: var(--white); */
      background: rgb(162, 169, 200);
      min-height: 100vh;
      height: 100vh;
      width: 250px;
      margin-left: -250px;
      transition: var(--transition);

      overflow: scroll;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;

      transition-duration: 400ms;
    }
    .nav-link {
      display: flex;
      align-items: center;
      /* color: var(--grey-500); */
      color: black;
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: var(--transition);
      /* background-color: blue; */
    }
    .submenu-link {
      padding-left: 4rem;
      background-color: grey;
      transition-duration: 400ms;
    }

    .submenu-container {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      transition-duration: 400ms;
    }
    .main-menu {
      display: flex;
    }
    .nav-link:hover {
      background: var(--grey-50);
      padding-left: 3rem;
      color: var(--grey-900);
      /* background-color: rgb(51, 127, 227); */
      margin: 0 0 0 1rem;
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
    }
    .nav-link:hover .icon {
      color: var(--primary-500);
      /* color: blue; */
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      /* background: var(--grey-50); */
      padding-left: 3rem;
      /* color: var(--grey-900); */
      color: white;
      background-color: rgb(51, 127, 227);
      margin: 0 0 0 1rem;
      border-top-left-radius: 2rem;
      border-bottom-left-radius: 2rem;
    }
    .active .icon {
      color: var(--primary-500);
    }
  }
`;
export default Wrapper;
