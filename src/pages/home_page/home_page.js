import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import "./home_page.css";

const HomeComponent = (props) => {
    const isLogin = props.isLogin;
    return (
        <div className="home-page">
            home_page
        </div>
    )
}

const HomePage = pageLayoutDefault(HomeComponent);
export default HomePage;