const people = [
  "mathematician",
  "chemist",
  "physicist",
  "chemist",
  "astrophysicist",
];

export default function Search() {
  const listItems = people.map((person) => (
    <li className="mt-5 mx-5" key={person}>
      <a href="/Review">{person}</a>
    </li>
  ));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-2xl text-pretty">Search Result</h1>
        <div>
          <a href="/">Back</a>
        </div>
        <div className="z-10 w-full max-w-5xl items-center mt-80 h-[26vh] absolute ">
          <ul>{listItems}</ul>
        </div>
      </div>
    </main>
  );
}
