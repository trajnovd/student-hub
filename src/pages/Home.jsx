import HomeDiscounts from "../features/home/HomeDiscounts";
import HomeEvents from "../features/home/HomeEvents";
import HomeNewsletter from "../features/home/HomeNewsletter";
import HomeScholarships from "../features/home/HomeScholarships";
import Title from "../features/home/Title";
import CreateStudentForm from "../features/newsletter/CreateStudentForm";

function Home() {
  return (
    <>
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
      <div className="pt-36">
        <HomeNewsletter />
      </div>
    </>
  );
}

export default Home;
