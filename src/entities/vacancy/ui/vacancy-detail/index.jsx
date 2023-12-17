import { Button, Divider, message, QRCode, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { $api } from "../../../../shared/api/api.js";
import { UserContext } from "../../../../app/providers/user-provider/UserProvider.jsx";
import { plural } from "../../../../shared/lib/plural/Plural.js";

export const VacancyDetail = ({
  vac_url,
  id,
  salary,
  currency,
  jobName,
  duty,
  location,
}) => {
  const [myResumes, setMyResumes] = useState([]);
  const [resumesData, setResumesData] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const { user } = useContext(UserContext);

  const onChange = (value) => {
    setSelectedResume(value);
  };

  const { token } = useContext(UserContext);

  useEffect(() => {
    const getMyResumes = async () => {
      const response = await $api.get("/resume");

      const data = response.data;

      const filteredData = user
        ? data.filter((item) => user.id === item.user_uuid)
        : data;

      setResumesData(filteredData);

      const transformedData = filteredData.map((item) => ({
        value: item.id,
        label: item.title,
      }));
      setMyResumes(transformedData);
    };

    getMyResumes();
  }, []);

  useEffect(() => {
    const attachedResumes =
      JSON.parse(localStorage.getItem("attachedResumes")) || [];
    if (attachedResumes.length === 0) {
      const initialData = [
        { vacancyId: 1, resumeId: "someResumeId1" },
        { vacancyId: 2, resumeId: "someResumeId2" },
      ];

      localStorage.setItem("attachedResumes", JSON.stringify(initialData));
    }
    const isAttached = attachedResumes.some((item) => item.vacancyId === id);
    if (isAttached) {
      const selectedResume = attachedResumes.find(
        (item) => item.vacancyId === id,
      ).resumeId;
      setSelectedResume(selectedResume);
    }
  }, [id]);

  const handleAttachResume = () => {
    if (selectedResume) {
      const attachedResumes =
        JSON.parse(localStorage.getItem("attachedResumes")) || [];

      const isAlreadyAttached = attachedResumes.some(
        (item) => item.vacancyId === id && item.resumeId === selectedResume,
      );

      if (!isAlreadyAttached) {
        attachedResumes.push({
          vacancyId: id,
          resumeId: selectedResume,
        });
        localStorage.setItem(
          "attachedResumes",
          JSON.stringify(attachedResumes),
        );
        message.success("Резюме прикреплено");
      } else {
        message.warning("Резюме уже прикреплено к этой вакансии");
      }
    } else {
      message.warning("Выберите резюме для прикрепления");
    }
  };

  return (
    <div className="">
      <h3>{jobName}</h3>
      <p>
        Заработная плата {salary} {currency}
      </p>

      <Divider />
      <div dangerouslySetInnerHTML={{ __html: duty }} />
      <Divider />
      {location.map((item) => (
        <p key={item.location}>{item.location}</p>
      ))}

      <Divider />

      <h3>
        Вакансия доступна по QR или по{" "}
        <a className="uppercase text-blue-400" target="_blank" href={vac_url}>
          ссылке
        </a>
      </h3>

      <Divider />

      <QRCode bgColor={"#fff"} value={vac_url || "-"} className="mb-3" />
      {token && (
        <div className="flex flex-col gap-5">
          <Select
            disabled={
              !localStorage.getItem("attachedResumes") ||
              localStorage.getItem("attachedResumes").includes(id)
            }
            showSearch
            style={{ width: 200 }}
            placeholder="Доступные резюме:"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={myResumes}
          />

          {localStorage.getItem("attachedResumes") &&
            selectedResume &&
            resumesData
              .filter((resume) => resume.id === selectedResume)
              .map((resume) => (
                <div
                  key={resume.id}
                  className="grid grid-cols-2 place-content-center border-2 gap-1 p-1 rounded-md"
                >
                  <h3>
                    <span className="font-bold text-sm">ФИО:</span> {resume.fio}
                  </h3>
                  <p>
                    <span className="font-bold text-sm">Email:</span>{" "}
                    {resume.email}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Номер телефона:</span>{" "}
                    {resume.phone_number}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Адрес:</span>{" "}
                    {resume.address}
                  </p>
                  <p>
                    <span className="font-bold text-sm">Опыт работы:</span>{" "}
                    {resume.experience}&nbsp;
                    {plural(resume.experience)}
                  </p>
                  {resume.description && (
                    <p>
                      <span className="font-bold text-sm">Описание:</span>{" "}
                      {resume.description}
                    </p>
                  )}
                </div>
              ))}

          <Button onClick={handleAttachResume} disabled={!selectedResume}>
            {localStorage.getItem("attachedResumes") &&
            localStorage.getItem("attachedResumes").includes(id)
              ? "Прикреплено!"
              : "Прикрепить резюме"}
          </Button>
        </div>
      )}
    </div>
  );
};
