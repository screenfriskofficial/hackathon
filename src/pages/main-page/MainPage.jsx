import { Link } from "react-router-dom";

const itemsList = [
  {
    id: 1,
    icon: "/freeLegalHelp.png",
    title: "О бесплатной юридической помощи",
    bgColor: "bg-green-100",
  },
  {
    id: 2,
    icon: "/socialServices.png",
    title: "Социальные сервисы",
    bgColor: "bg-red-100",
  },
  {
    id: 3,
    icon: "/waterCounter.png",
    title: "Показани водосчетчиков",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    icon: "/aero.png",
    title: "Табло аэропорта",
    bgColor: "bg-yellow-100",
  },
  {
    id: 5,
    icon: "/wind.png",
    title: "SkiPass",
    bgColor: "bg-pink-100",
  },
  {
    id: 6,
    icon: "/vacancies.png",
    title: "Вакансии",
    bgColor: "bg-slate-200",
    linkTo: "/vacancies",
  },
];
const MainPage = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <h3 className="flex font-bold text-xl">Сервисы</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {itemsList.map((item) => (
          <Link key={item.id} to={item.linkTo}>
            <div
              className={`flex h-52 w-60 ${item.bgColor} rounded-md p-5 flex-col gap-5 shadow-md hover:cursor-pointer hover:opacity-70 transition-all duration-200`}
            >
              <img className="w-14 h-14" src={item.icon} alt={item.title} />
              <p className="font-medium text-[16px]">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
