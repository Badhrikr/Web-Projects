import "react-toastify/dist/ReactToastify.css";
import HomeLayout from "../layouts/home-layout";
import Banner from "../modules/home/components/banner";
import MigrationServices from "../modules/home/components/migration-services";
import OurServices from "../modules/home/components/our-services";
import SourceTechnologies from "../modules/home/components/source-technologies";
import TargetTechnologies from "../modules/home/components/target-technologies";
import ChatbotContainer from "../modules/chatbot/components";

function HomePage() {
  return (
    <div className="relative">
      <Banner />
      <OurServices />
      <br />
      <br />
      <MigrationServices />
      <br />
      <br />
      <SourceTechnologies />
      <br />
      <br />
      <TargetTechnologies />
      <div className="fixed right-8 bottom-8">
        <ChatbotContainer />
      </div>
    </div>
  );
}

HomePage.PageLayout = HomeLayout;
export default HomePage;
