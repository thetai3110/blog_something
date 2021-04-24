import CourseSuggestedComponent from "./components/course-suggested/course-suggested.component";

const HomePage = ({theme}) => {
    return (
        <div className="home-page">
            <CourseSuggestedComponent theme={theme}/>
        </div>
    )
}

export default HomePage;