import { Header } from "../../components/Header";
import { PersonList } from "../../components/PersonList";

export default function details() {
  return (
    <main
      id="main"
      className="flex justify-center items-center flex-col h-full w-full bg-backGround-body"
    >
      <Header></Header>
      <PersonList></PersonList>
    </main>
  );
}
