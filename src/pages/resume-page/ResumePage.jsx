import { useContext, useEffect, useState } from "react";
import { $api } from "../../shared/api/api.js";
import { ResumeCard } from "../../entities/resume/index.jsx";
import { Spin } from "antd";
import { UserContext } from "../../app/providers/user-provider/UserProvider.jsx";
import { Spinner } from "../../shared/ui/spinner/index.jsx";

const ResumePage = () => {
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getResumes = async () => {
      setIsLoading(true);
      try {
        const response = await $api.get("/resume");

        const data = response.data;

        const filteredData = user
          ? data.filter((item) => user.id === item.user_uuid)
          : data;

        setResumes(filteredData);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getResumes();
  }, [user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className=" container m-auto flex flex-col">
      {error && error.message}
      <h3 className={"mt-4 text-xl uppercase font-bold"}>Все резюме</h3>
      {resumes && resumes.length < 1 && (
        <span className="flex items-center justify-center w-full">
          Тут пусто...
        </span>
      )}
      {resumes.map((resume) => (
        <ResumeCard key={resume.id} {...resume} />
      ))}
    </div>
  );
};

export default ResumePage;
