import { Button, Card, message, Modal } from "antd";
import { useState } from "react";
import { ResumeDetail } from "./ui/resume-detail/index.jsx";
import { DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import { Spinner } from "../../shared/ui/spinner/index.jsx";
import { useMutation, useQueryClient } from "react-query";

export const ResumeCard = (props) => {
  const {
    id,
    title,
    fio,
    experience,
    email,
    phone_number,
    salary,
    schedule,
    employment,
    education,
    description,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { Meta } = Card;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();

  const deleteItem = async (id) => {
    const response = await axios.delete(
      `https://63dacbd3a6b96559.mokky.dev/resume/${id}`,
    );
  };

  const mutation = useMutation((id) => deleteItem(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("yourQueryKey");
      message.success("Резюме успешно удалено");
    },
    onError: () => {
      message.error("Ошибка при удалении резюме");
    },
  });

  const handleDeleteResume = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="">
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={title}
          extra={<Button onClick={showModal}>Узнать больше</Button>}
          actions={[
            <DeleteTwoTone
              onClick={() => handleDeleteResume(id)}
              style={{ fontSize: "20px" }}
              twoToneColor="red"
            />,
          ]}
        >
          <Meta title={fio} description={`Зарплата: ${salary} руб.`} />
        </Card>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ResumeDetail
          title={title}
          experience={experience}
          email={email}
          phone_number={phone_number}
          schedule={schedule}
          employment={employment}
          education={education}
          description={description}
          salary={salary}
          id={id}
        />
      </Modal>
    </>
  );
};
