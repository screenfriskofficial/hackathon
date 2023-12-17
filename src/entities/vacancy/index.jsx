import { Button, Card, Modal } from "antd";
import { useState } from "react";
import { VacancyDetail } from "./ui/vacancy-detail/index.jsx";
import { HeartTwoTone } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { favoritesActions } from "../favorites/models/slice/favoritesSlice.jsx";

export const VacancyCard = (props) => {
  const {
    id,
    salary_min,
    salary_max,
    jobName,
    salary,
    currency,
    vac_url,
    duty,
    location,
    companyName,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites);
  const isFavorite = favorites.some((item) => item.id === id);

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

  const handleAdd = () => {
    dispatch(
      favoritesActions.addToFavorites({
        id,
        salary_min,
        salary_max,
        jobName,
        salary,
        currency,
        vac_url,
        duty,
        location,
        companyName,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(favoritesActions.removeFromFavorites(id));
  };
  console.log(salary);

  return (
    <>
      <Card
        style={{ marginTop: 16 }}
        headStyle={{ background: "#41393E", color: "#fff" }}
        type="inner"
        title={jobName}
        extra={
          <Button className="bg-blue-500" type="primary" onClick={showModal}>
            Узнать больше
          </Button>
        }
        actions={[
          isFavorite ? (
            <HeartTwoTone
              onClick={handleRemove}
              style={{ fontSize: "20px" }}
              twoToneColor="red"
            />
          ) : (
            <HeartTwoTone
              onClick={handleAdd}
              style={{ fontSize: "20px" }}
              twoToneColor="ccc"
            />
          ),
        ]}
      >
        <p>{companyName}</p>
        <Meta
          title={`Зарплата: ${
            salary_min < 1 ? "до " + salary_max + currency : salary + currency
          }`}
        />
      </Card>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        bodyProps={{
          style: { overflowY: "auto", maxHeight: "calc(100vh - 200px)" },
        }}
        onCancel={handleCancel}
        footer={null}
      >
        <VacancyDetail
          vac_url={vac_url}
          id={id}
          salary_min={salary_min}
          salary_max={salary_max}
          currency={currency}
          salary={salary}
          jobName={jobName}
          duty={duty}
          location={location}
        />
      </Modal>
    </>
  );
};
