import { Button, Card, Modal } from "antd";
import { useState } from "react";
import { ResumeDetail } from "./ui/resume-detail/index.jsx";

export const ResumeCard = (props) => {
  const {
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

  return (
    <>
      <div className="">
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title={title}
          extra={<Button onClick={showModal}>Узнать больше</Button>}
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
        />
      </Modal>
    </>
  );
};
