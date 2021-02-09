import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import CourseSuggestedComponent from "./course_suggested_component/course_suggested.component";

const HomeComponent = (props) => {
    return (
        <div className="home-page">
            <CourseSuggestedComponent />
        </div>
    )
}

const HomePage = pageLayoutDefault(HomeComponent);
export default HomePage;