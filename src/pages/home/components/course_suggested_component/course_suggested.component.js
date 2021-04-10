import CourseItemComponent from '../course_item/courseitem.component';
import './course_suggested.component.css';

const CourseSuggestedComponent = () => {

    return (
        <div className="suggested">
            <h3>Khóa học</h3>
            <div>
                <div className="row">
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent />
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent />
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent />
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSuggestedComponent;