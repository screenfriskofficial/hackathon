import { useEffect, useState } from "react";
import { Pagination, Select, Input, Button, message } from "antd";
import axios from "axios";
import { VacancyCard } from "../../entities/vacancy/index.jsx";
import { Spinner } from "../../shared/ui/spinner/index.jsx";
import { $api } from "../../shared/api/api.js";

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
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [category, setCategory] = useState(options[0].value);
  const [region, setRegion] = useState(65);
  const [searchValue, setSearchValue] = useState("");

  const { Search } = Input;

  useEffect(() => {
    const getRegions = async () => {
      const response = await $api.get("/regions");
      setRegions(response.data);
    };
    getRegions();
  }, []);

  const onChangeCategory = (value) => {
    setCategory(value);
    setSearchValue("");
    setCurrentPage(1);
  };

  const onChangeRegion = (value) => {
    setRegion(value);
    setSearchValue("");
    setCurrentPage(1);
  };
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value, info) => {
    setSearchValue(value);
    setCategory("");
  };

  useEffect(() => {
    const getVacancies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://opendata.trudvsem.ru/api/v1/vacancies/region/${region}`,
          {
            params: {
              text: searchValue,
              limit: 10,
              offset: currentPage,
              industry: searchValue.length >= 1 ? "" : category,
            },
          },
        );
        const data = response.data.results?.vacancies || [];
        setVacancies(data);
      } catch (e) {
        message.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getVacancies();
  }, [currentPage, limit, searchValue, category, region]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={"container m-auto flex flex-col"}>
      <Search
        placeholder="Поиск по вакансиям"
        onSearch={onSearch}
        className={"mt-4"}
      />

      {regions && (
        <div className="flex flex-row gap-4 items-center">
          <Select
            className="mt-4"
            style={{ width: "50%" }}
            defaultValue={category}
            placeholder="Сферы деятельности"
            onChange={onChangeCategory}
            optionLabelProp="label"
            options={options}
          />

          <Select
            className="mt-4"
            style={{ width: "50%" }}
            defaultValue={region}
            placeholder="Выбор региона"
            onChange={onChangeRegion}
            optionLabelProp="label"
            options={regions}
          />
        </div>
      )}

      {vacancies.length < 1 && (
        <span className="w-full flex justify-center items-center">
          Тут пусто
        </span>
      )}
      {vacancies.map((vacancy) => (
        <VacancyCard
          companyName={vacancy.vacancy.company.name}
          key={vacancy.vacancy.id}
          id={vacancy.vacancy.id}
          salary_min={vacancy.vacancy.salary_min}
          salary_max={vacancy.vacancy.salary_max}
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
        total={limit}
      />
    </div>
  );
};

export default VacanciesPage;
