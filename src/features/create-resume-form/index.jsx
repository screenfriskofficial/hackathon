import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, message, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { createResumeSchema } from "./validation/createResumeSchema.js";
import { $api } from "../../shared/api/api.js";
import { UserContext } from "../../app/providers/user-provider/UserProvider.jsx";

export const CreateResumeForm = () => {
  const {
    formState: { errors },

    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(createResumeSchema),
  });

  const { user } = useContext(UserContext);

  const { TextArea } = Input;

  const [scheduleValue, setScheduleValue] = useState("");

  const [employmentValue, setEmploymentValue] = useState("");

  const [educationValue, setEducationValue] = useState("");

  const [descriptionValue, setDescriptionValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const fullData = {
      ...data,
      user_uuid: user.id,
      schedule: scheduleValue,
      employment: employmentValue,
      education: educationValue,
      description: descriptionValue,
    };
    try {
      setIsLoading(true);
      const response = await $api.post(
        "https://63dacbd3a6b96559.mokky.dev/resume",
        fullData,
      );
      message.success("Резюме успешно создано!", 1);
    } catch (e) {
      message.error("Ошибка создания резюме " + e, 1);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeEmployment = (value) => {
    setEmploymentValue(value);
  };

  const onChangeSchedule = (value) => {
    setScheduleValue(value);
  };

  const onChangeEducation = (value) => {
    setEducationValue(value);
  };

  const onChangeDescription = (e) => {
    setDescriptionValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 gap-2">
      <h4 className="uppercase font-medium">Создание резюме</h4>
      <section>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input placeholder={"Должность"} {...field} />}
        />
        <p className="text-red-600">{errors.title?.message}</p>
      </section>

      <section>
        <Controller
          name="fio"
          control={control}
          render={({ field }) => <Input placeholder={"ФИО"} {...field} />}
        />
        <p className="text-red-600">{errors.fio?.message}</p>
      </section>

      <section>
        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <Input placeholder={"Желаемая зарплата"} {...field} />
          )}
        />
        <p className="text-red-600">{errors.salary?.message}</p>
      </section>

      <section>
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <Input placeholder={"Номер телефона"} {...field} />
          )}
        />
        <p className="text-red-600">{errors.phone_number?.message}</p>
      </section>

      <section>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder={"Электронная почта"} {...field} />
          )}
        />
        <p className="text-red-600">{errors.email?.message}</p>
      </section>

      <section>
        <Controller
          name="address"
          control={control}
          render={({ field }) => <Input placeholder={"Адрес"} {...field} />}
        />
        <p className="text-red-600">{errors.address?.message}</p>
      </section>

      <section>
        <Controller
          name="experience"
          control={control}
          render={({ field }) => (
            <Input placeholder={"Опыт работы"} {...field} />
          )}
        />
        <p className="text-red-600">{errors.experience?.message}</p>
      </section>

      <section>
        <TextArea
          showCount
          maxLength={350}
          style={{ height: 120, resize: "none", marginBottom: 15 }}
          placeholder={"Опишите ваш опыт"}
          onChange={onChangeDescription}
        />

        <p className="text-red-600">{errors.description?.message}</p>
      </section>

      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Тип занятости"
        defaultValue={["Полная занятость"]}
        onChange={onChangeEmployment}
        optionLabelProp="label"
        options={[
          {
            label: "Удаленная работа",
            value: "Удаленная работа",
          },
          {
            label: "Частичная занятость",
            value: "Частичная занятость",
          },
          {
            label: "Стражировка",
            value: "Стражировка",
          },
          {
            label: "Полная занятость",
            value: "Полная занятость",
          },
        ]}
      />

      <Select
        placeholder={"График работы"}
        onChange={onChangeSchedule}
        options={[
          {
            value: "Полный рабочий день",
            label: "Полный рабочий день",
          },
          {
            value: "Неполный рабочий день",
            label: "Неполный рабочий день",
          },
          {
            value: "Почасовой",
            label: "Почасовой",
          },
        ]}
      />

      <Select
        placeholder={"Образование"}
        onChange={onChangeEducation}
        options={[
          {
            value: "Среднее общее",
            label: "Среднее общее",
          },
          {
            value: "Среднее профессиональное",
            label: "Среднее профессиональное",
          },
          {
            value: "Высшее",
            label: "Высшее",
          },
        ]}
      />

      <Button loading={isLoading} htmlType="submit">
        Создать резюме
      </Button>
    </form>
  );
};
