import HomeDiscounts from "../features/home/HomeDiscounts";
import HomeEvents from "../features/home/HomeEvents";
import HomeScholarships from "../features/home/HomeScholarships";
import Title from "../features/home/Title";

function Home() {
  return (
    <div>
      <span>
        <Title />
      </span>
      <span id="events-section">
        <HomeEvents />
      </span>
      <span>
        <HomeDiscounts />
      </span>
      <span>
        <HomeScholarships />
      </span>
    </div>
  );
}

export default Home;
