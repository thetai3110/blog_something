import CourseItemComponent from '../course-item/course-item.component';
import {themes} from '../../../../themes/themes';

import './course-suggested.component.css';

const CourseSuggestedComponent = ({theme}) => {

    return (
        <div className="suggested">
            <h3 style={themes[theme].page_name}>Khóa học</h3>
            <div>
                <div className="row">
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent theme={theme}/>
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent theme={theme}/>
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent theme={theme}/>
                    </div>
                    <div className="col l-3 md-6 c-12">
                        <CourseItemComponent theme={theme}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSuggestedComponent;