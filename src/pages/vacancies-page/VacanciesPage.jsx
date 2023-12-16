import { useEffect, useState } from "react";
import { Spin, Pagination, Select } from "antd";
import axios from "axios";
import { VacancyCard } from "../../entities/vacancy/index.jsx";

const options = [
  { value: "DeskWork", label: "Административная работа, секретариат, АХО" },
  {
    value: "Finances",
    label: "Банки, кредит, страхование, пенсионное обеспечение",
  },
  { value: "Safety", label: "Безопасность, службы охраны" },
  {
    value: "AccountingTaxesManagement",
    label: "Бухгалтерия, налоги, управленческий учет",
  },
  { value: "Management", label: "Высший менеджмент" },
  {
    value: "StateServices",
    label: "Государственная служба, некоммерческие организации",
  },
  { value: "Resources", label: "Добывающая промышленность" },
  { value: "HomePersonal", label: "Домашний персонал" },
  { value: "Communal", label: "ЖКХ, эксплуатация" },
  { value: "Medicine", label: "Здравоохранение и социальное обеспечение" },
  {
    value: "InformationTechnology",
    label: "Информационные технологии, телекоммуникации, связь",
  },
  { value: "Culture", label: "Искусство, культура и развлечения" },
  {
    value: "HumanRecruitment",
    label: "Кадровая служба, управление персоналом",
  },
  {
    value: "Consulting",
    label: "Консалтинг, стратегическое развитие, управление",
  },
  { value: "RootLightIndustry", label: "Легкая промышленность" },
  {
    value: "Forest",
    label: "Лесная, деревообрабатывающая, целлюлозно-бумажная промышленность",
  },
  { value: "Marketing", label: "Маркетинг, реклама, PR" },
  { value: "MechanicalEngineering", label: "Машиностроение" },
  { value: "Metallurgy", label: "Металлургия, металлообработка" },
  { value: "Education", label: "Образование, наука" },
  { value: "Food", label: "Пищевая промышленность" },
  { value: "Sales", label: "Продажи, закупки, снабжение, торговля" },
  { value: "Industry", label: "Производство" },
  { value: "NotQualification", label: "Работы, не требующие квалификации" },
  { value: "WorkingSpecialties", label: "Рабочие специальности" },
  { value: "Agricultural", label: "Сельское хозяйство, экология, ветеринария" },
  {
    value: "SportsFitnessBeautySalons",
    label: "Спорт, фитнес, салоны красоты",
  },
  {
    value: "BuldindRealty",
    label: "Строительство, ремонт, стройматериалы, недвижимость",
  },
  { value: "Transport", label: "Транспорт, автобизнес, логистика, склад, ВЭД" },
  { value: "Restaurants", label: "Туризм, гостиницы, рестораны" },
  {
    value: "ServiceMaintenance",
    label: "Услуги населению, сервисное обслуживание",
  },
  {
    value: "ChemicalAndFuelIndustry",
    label: "Химическая, нефтехимическая, топливная промышленность",
  },
  { value: "ElectricpowerIndustry", label: "Электроэнергетика" },
  { value: "Jurisprudence", label: "Юриспруденция" },
];

const VacanciesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [category, setCategory] = useState("Safety");

  const onChangeCategory = (value) => {
    setCategory(value);
  };
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getVacancies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://opendata.trudvsem.ru/api/v1/vacancies/region/65",
          {
            params: {
              limit: limit,
              offset: currentPage,
              industry: category,
            },
          },
        );
        const data = response.data.results?.vacancies || [];
        setVacancies(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getVacancies();
  }, [currentPage, limit, category]);

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className={"container m-auto flex flex-col"}>
      {error && <div>Error: {error}</div>}
      <Select
        className={"mt-4"}
        showSearch
        defaultValue={category}
        style={{ width: 200 }}
        placeholder="Сферы деятельности:"
        optionFilterProp="children"
        onChange={onChangeCategory}
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
      />

      {vacancies.length < 1 && (
        <span className="w-full flex justify-center items-center">
          Тут пусто
        </span>
      )}
      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.vacancy.id}
          id={vacancy.vacancy.id}
          jobName={vacancy.vacancy["job-name"]}
          salary={vacancy.vacancy.salary}
          currency={vacancy.vacancy.currency}
          vac_url={vacancy.vacancy.vac_url}
          duty={vacancy.vacancy.duty}
          location={vacancy.vacancy.addresses.address}
        />
      ))}
      <Pagination
        rootClassName="mt-4"
        onChange={onChangePage}
        defaultCurrent={currentPage}
        total={vacancies.length}
      />
    </div>
  );
};

export default VacanciesPage;
