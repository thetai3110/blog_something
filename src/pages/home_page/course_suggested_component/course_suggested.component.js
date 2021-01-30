import CourseItemComponent from '../../../components/shared/course_item_component/course-item.component';
import './course_suggested.component.css';

const CourseSuggestedComponent = () => {

    return (
        <div className="suggested">
            <h3>Khóa học</h3>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-suggested" role="tab" aria-controls="nav-home" aria-selected="true">Khóa học gợi ý</a>
                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-learning" role="tab" aria-controls="nav-profile" aria-selected="false">Đang học</a>
                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-completed" role="tab" aria-controls="nav-contact" aria-selected="false">Đã học</a>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-suggested" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-learning" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-12">
                            <CourseItemComponent />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSuggestedComponent;