export function Header() {
  return (
    <header className=" fixed top-0 flex items-center bg-backGround-header text-center w-full h-fit p-4 container-xl d-flex flex-column flex-lg-row flex-items-center p-responsive height-full position-relative justify-center">
      <form id="search-form" className="flex w-full justify-center">
        <input
          form="search-form"
          type="text"
          aria-label="Search field"
          name="search"
          id="search"
          placeholder="Search for..."
          className=" focus-within:border-link pl-4 h-8 mx-8 w-full max-w-md bg-backGround-body border-solid border-2 border-border outline-none rounded-md"
        />
        <button
          type="submit"
          aria-label="Send Button"
          className="bg-link items-center rounded-md px-6 py-1 font-bold text-center hover:opacity-40 focus:border-solid focus:border-white focus:border  "
        >
          Send
        </button>
      </form>
    </header>
  );
}
