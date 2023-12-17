import { Divider } from "antd";
import { plural } from "../../../../shared/lib/plural/Plural.js";
import axios from "axios";

export const ResumeDetail = ({
  fio,
  title,
  experience,
  email,
  phone_number,
  schedule,
  employment,
  education,
  description,
  salary,
}) => {
  return (
    <div className="">
      <h4>{fio}</h4>
      <p>Желаемая зарплата: {salary} руб.</p>
      {description && <p>Описание: {description}</p>}
      <p>
        Опыт работы: {experience}&nbsp;
        {plural(experience)}.
      </p>
      <Divider />
      <p>Рабочий день: {schedule}</p>
      <p>
        Занятость: {employment.length > 1 ? employment.join(", ") : employment}
      </p>
      <p>Образование: {education}</p>
      <Divider />

      <h3>Связаться с {fio}</h3>
      <p>Электронная почта: {email}</p>
      <p>Номер телеофна: {phone_number}</p>
      <Divider />
    </div>
  );
};
