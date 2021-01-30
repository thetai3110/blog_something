import FooterComponent from "../shared/footer_component/footer.component";
import HeaderComponent from "../shared/header_component/header.component";

export const pageLayoutDefault = (PageComponent) => {
    return (props) => {
        return (
            <>
                <HeaderComponent />
                <div style={{backgroundColor: '#f8f9fb'}}>
                    <div style={{ paddingRight: '10%', paddingLeft: '10%', paddingTop: '25px' }}>
                        <PageComponent />
                    </div>
                </div>
                <FooterComponent />
            </>
        )
    }
}