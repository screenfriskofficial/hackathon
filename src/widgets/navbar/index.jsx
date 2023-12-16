import { Link, useLocation } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";

import { useContext, useState } from "react";
import { Button, Modal } from "antd";
import { CreateResumeForm } from "../../features/create-resume-form/index.jsx";
import { ProfileCard } from "../../entities/profile/index.jsx";
import { UserContext } from "../../app/providers/user-provider/UserProvider.jsx";

export const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { token } = useContext(UserContext);
  const location = useLocation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showProfileModal = () => {
    setIsProfileOpen(true);
  };

  const handleProfileOk = () => {
    setIsProfileOpen(false);
  };

  const handleProfileCancel = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      <header className="h-12 w-full flex items-center bg-gray-50 shadow-md text-black sticky top-0 z-10">
        <div className="container m-auto overflow-x-auto">
          <nav className="flex pr-5 pl-5 w-full justify-between">
            <div className="flex items-center gap-5">
              {token && location.pathname !== "/" && (
                <>
                  <Link to={"/"}>
                    <Button>Перейти к вакансиям</Button>
                  </Link>
                </>
              )}
              <Button onClick={showModal}>Создать резюме</Button>
            </div>

            {token ? (
              <Button
                onClick={showProfileModal}
                className="flex ml-5 items-center gap-3 cursor-pointer"
              >
                <UserIcon className="w-6 cursor-pointer" />
                <p>Профиль</p>
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button className="cursor-pointer">Вход</Button>
              </Link>
            )}
          </nav>
        </div>
      </header>
      <Modal
        open={isProfileOpen}
        onOk={handleProfileOk}
        onCancel={handleProfileCancel}
        footer={null}
      >
        <ProfileCard handleProfileCancel={handleProfileCancel} />
      </Modal>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateResumeForm />
      </Modal>
    </>
  );
};
