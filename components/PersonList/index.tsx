import { Person } from "../Person";
import { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "../Heading";
import { LoadingPage } from "../LoadingPage";
import { Box } from "../Box";
import { Header } from "../Header";
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
  const [urlBase, setUrlBase] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [countPerson, setCountPerson] = useState(0);
  const [personForPage, setPersonForPage] = useState(0);
  const [personData, setPersonData] = useState<ResultProps[]>([]);
  const [message, setMessage] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [page,setPage] = useState(1)

  function handleChange(event: any) {
    setMessage(event.target.value);
    console.log("Digitado:", event.target.value);
  }

  function next() {
    if(urlBase){
      if (page >= 9) {
        alert("Você já está na ultima página ");
        setPage(9)
      } else {
        setPage(page + 1);
        fetchPerson();
      }
    }else{
      alert("Não existe outra Página")
    }
  }

  function prev() {
    if(urlBase){
      if (page === 1)  {
        alert("Você já está na ultima página ");
        setPage(1);
      } 
      else  {
        setPage(page - 1);
        fetchPerson();
      }
    }
    else if(!urlBase && page >=9){
      setPage(page - 1);
      fetchPerson();
    }
    else{
      alert("Não existe outra Página")
    }
  }

  const fetchPerson = async () => {
    if (isSearch) {
      try {
        const res = await axios.get(
          `https://swapi.dev/api/people/?search=` + message
        );
        setCountPerson(res.data.count);
        setPersonForPage(res.data.results.length);
        setPersonData(res.data.results);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.get(
          `https://swapi.dev/api/people/?page=` + page
        );
        setCountPerson(res.data.count);
        setPersonForPage(res.data.results.length);
        setPersonData(res.data.results);
        setUrlBase(res.data.next)
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateSearch = async () => {
    if (message === "" || null) {
      alert("Please insert a name");
      console.log("Field in Blank");
    } else if (message.length <= 1) {
      alert("Your search is too short");
      console.log("Short Search");
    } else {
      setIsSearch(true);
      console.log("Pesquisa OK " + isSearch);
    }
  };

  useEffect(() => {
    fetchPerson();
    if (personData.length >= 1) {
      setIsLoaded(true);
    }
  }, [personData, countPerson, personForPage, isSearch]);

  {
    if (isLoaded) {
      return (
        <>
          <Header onChange={handleChange} onSubmit={validateSearch} />
          <Box></Box>
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
          <span>
            <input type="button" value="<" onClick={prev}/>
            {page}
            <input type="button" value=">" onClick={next} />
          </span>
        </>
      );
    } else {
      return <LoadingPage></LoadingPage>;
    }
  }
}
