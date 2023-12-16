import { Link } from "react-router-dom";
import { App, QRCode } from "antd";

const itemsList = [
  {
    id: 6,
    icon: "/vacancies.png",
    title: "Вакансии",
    bgColor: "bg-slate-200",
    linkTo: "/vacancies",
  },
];
const MainPage = () => {
  const { modal } = App.useApp();

  return (
    <div className="w-full flex items-center justify-center flex-col gap-3">
      <h3 className="flex font-bold text-xl">Сервисы</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {itemsList.map((item) => (
          <>
            <Link key={item.id} to={item.linkTo}>
              <div
                className={`flex h-52 w-60 ${item.bgColor} rounded-md p-5 flex-col gap-5 shadow-md hover:cursor-pointer hover:opacity-70 transition-all duration-200`}
              >
                <img className="w-14 h-14" src={item.icon} alt={item.title} />
                <p className="font-medium text-[16px]">{item.title}</p>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
