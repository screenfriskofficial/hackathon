import { Divider } from "antd";
import { plural } from "../../../../shared/lib/plural/Plural.js";
import axios from "axios";

export const ResumeDetail = ({
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
      <h4>{title}</h4>
      <p>Заработная плата: {salary} руб.</p>
      {description && <p>Описание: {description}</p>}
      <p>
        Требуемый опыт работы: {experience}&nbsp;
        {plural(experience)}.
      </p>
      <Divider />
      <p>Рабочий день: {schedule}</p>
      <p>
        Занятость: {employment.length > 1 ? employment.join(", ") : employment}
      </p>
      <p>Образование: {education}</p>
      <Divider />

      <h3>Связаться с {title}</h3>
      <p>Наша почта: {email}</p>
      <p>Звонить сюда: {phone_number}</p>
      <Divider />
    </div>
  );
};
