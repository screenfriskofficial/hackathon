import { useEffect, useState } from "react";
import { $api } from "../../shared/api/api.js";
import { ResumeCard } from "../../entities/resume/index.jsx";

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const getResumes = async () => {
      const response = await $api.get("/resume");
      setResumes(response.data);
    };
    getResumes();
  }, []);

  return (
    <div className="container m-auto">
      <h3 className={"mt-4 text-xl uppercase font-bold"}>Все резюме</h3>
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} {...resume} />
      ))}
    </div>
  );
};

export default ResumePage;
