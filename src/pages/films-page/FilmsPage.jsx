import { useEffect, useState } from "react";
import axios from "axios";

const FilmsPage = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const getFilms = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
      );
      setFilms(response.data);
    };

    console.log(films);

    getFilms();
  }, []);

  return <div></div>;
};
export default FilmsPage;
