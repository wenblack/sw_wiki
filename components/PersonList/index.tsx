import { Person } from "../Person";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "../Heading";
import { LoadingPage } from "../LoadingPage";
export interface ResultProps {
  count: number;
  name: string;
  height: number;
  mass: string;
  films: any;
  hair_color: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender: string;
  url: string;
}

export function PersonList() {
  const [urlBase, setUrlBase] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countPerson, setCountPerson] = useState(0);
  const [personForPage, setPersonForPage] = useState(0);
  const [personData, setPersonData] = useState<ResultProps[]>([]);

  function next() {
    if (urlBase >= 10) {
      alert("Você já está na ultima página ");
      setUrlBase(10);
    } else {
      setUrlBase(urlBase + 1);
      fetchPerson();
    }
  }

  function prev() {
    if (urlBase === 1) {
      alert("Você já está na ultima página ");
      setUrlBase(1);
    } else {
      setUrlBase(urlBase - 1);
      fetchPerson();
    }
  }

  const fetchPerson = async () => {
    try {
      const res = await axios.get(
        `https://swapi.dev/api/people/?page=` + urlBase
      );
      setCountPerson(res.data.count);
      setPersonForPage(res.data.results.length);
      setPersonData(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPerson();
    if (personData.length === 10) {
      setIsLoaded(true);
    }
  }, [personData, countPerson, personForPage]);

  {
    if (isLoaded) {
      return (
        <>
          <Heading total={personData.length}></Heading>
          <section
            id="personList"
            className=" flex h-full w-full mx-6  items-start justify-center max-w-3xl"
          >
            <ul id="persons">
              {personData.map((persons) => (
                <Person
                  key={persons.url}
                  name={persons.name}
                  height={persons.height / 100}
                  mass={persons.mass}
                  films={persons.films.length}
                  hair_color={persons.hair_color}
                  gender={persons.gender}
                  url={persons.url}
                  count={persons.count}
                ></Person>
              ))}
            </ul>
          </section>
        </>
      );
    } else {
      return <LoadingPage></LoadingPage>;
    }
  }
}
