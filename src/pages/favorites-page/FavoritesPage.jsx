import { VacancyCard } from "../../entities/vacancy/index.jsx";
import { useDispatch, useSelector } from "react-redux";

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.favorites);

  return (
    <div className="container m-auto flex w-full justify-center flex-col ">
      {favorites.length < 1 && (
        <p className="text-xl">Тут пусто 😢. Добавьте вакансию!</p>
      )}
      {favorites.map((item) => (
        <VacancyCard key={item.id} {...item} />
      ))}
    </div>
  );
};
export default FavoritesPage;
