import { Button } from "antd";
import { useContext } from "react";
import { UserContext } from "../../app/providers/user-provider/UserProvider.jsx";
import { AuthContext } from "../../app/providers/auth-provider/AuthProvider.jsx";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProfileCard = ({ handleProfileCancel }) => {
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const favorites = useSelector((state) => state.favorites.favorites);

  const handleLogout = () => {
    logout();
    handleProfileCancel();
  };

  return (
    <div className="text-xl flex flex-col gap-2">
      <h3 className="font-bold">Ваш профиль:</h3>

      <div>
        <p>Здравствуйте, {user && user.email}!</p>
      </div>

      <Link to={"/resume"}>
        <Button onClick={handleProfileCancel} className="w-full">
          Посмотреть свои резюме
        </Button>
      </Link>
      <Link to={"/favorites"} className="w-full">
        <Button onClick={handleProfileCancel} className="w-full">
          Избранные вакансии ({favorites.length}шт.)
        </Button>
      </Link>

      <Button onClick={handleLogout}>Выйти из аккаунта</Button>
    </div>
  );
};
