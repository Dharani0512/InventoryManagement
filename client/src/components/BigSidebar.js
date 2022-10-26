import { useAppcontext } from "../context/appContext";
import NavLinks from "./NavLinks";
import Logo1 from "../components/Logo2";
import Wrapper from "../assets/wrappers/BigSidebar";
const BigSidebar = () => {
  const { showSidebar } = useAppcontext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo1 />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
