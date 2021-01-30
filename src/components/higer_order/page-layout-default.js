import FooterComponent from "../shared/footer_component/footer.component";
import HeaderComponent from "../shared/header_component/header.component";

export const pageLayoutDefault = (PageComponent) => {
    return (props) => {
        return (
            <div>
                <HeaderComponent />
                <PageComponent />
                <FooterComponent />
            </div >
        )
    }
}