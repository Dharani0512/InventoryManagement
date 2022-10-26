import React from "react";
import BitsLogo from "../../components/BitsLogo";
import ProjectSearch from "../../components/searchContainer/ProjectSearch";
import { Projects } from "../../pages/adminDashboard";

const ProjectsPage = ({ url }) => {
  return (
    <div>
      <ProjectSearch />
      <Projects url={url} />
      <BitsLogo/>
    </div>
  );
};

export default ProjectsPage;
