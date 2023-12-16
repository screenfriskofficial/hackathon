import { Button, Divider, message, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { $api } from "../../../../shared/api/api.js";
import { UserContext } from "../../../../app/providers/user-provider/UserProvider.jsx";

export const VacancyDetail = ({
  salary,
  currency,
  jobName,
  duty,
  location,
}) => {
  const [myResumes, setMyResumes] = useState([]);
  const [resume, setResume] = useState("");
  const { user } = useContext(UserContext);

  const onChange = (value) => {
    setResume(value);
  };

  const { token } = useContext(UserContext);

  useEffect(() => {
    const getMyResumes = async () => {
      const response = await $api.get("/resume");

      const data = response.data;

      const filteredData = user
        ? data.filter((item) => user.id === item.user_uuid)
        : data;

      const transformedData = filteredData.map((item) => ({
        value: item.title,
        label: item.title,
      }));
      setMyResumes(transformedData);
    };

    getMyResumes();
  }, []);

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
      {token && (
        <div className="flex flex-col gap-5">
          <Select
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
          <Button
            onClick={() => message.success("Резюме прикреплено", 1)}
            disabled={!resume}
          >
            Прикрепить резюме
          </Button>
        </div>
      )}
    </div>
  );
};
