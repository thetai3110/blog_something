import { pageLayoutDefault } from "../../components/higer_order/page-layout-default";
import { SideBarComponent } from "../../components/shared/sidebar_component/sidebar.component";
import "./blog_page.css";

const BlogComponent = () => {
    return (
        <div className="blog-page">
            <div>
                <div className="blog-content">
                    <div className="row">
                        <div className="col-xl-2">
                            <SideBarComponent />
                        </div>
                        <div className="col-xl-10">
                            <div className="content">
                                <h3>Toán Tử (Operator)</h3>
                                <p>Bạn nên biết là lập trình không khác gì làm toán cả, tất cả chúng ta, những Lập Trình Viên, chỉ đơn giản là đang vận dụng các phép toán mà chúng ta đã từng được học vào trong việc lập trình ra các ứng dụng mà thôi. Và để làm quen lại với kiến thức toán, chúng ta cùng quay về với khái niệm Biểu Thức. Trong toán học định nghĩa rằng Biểu Thức là sự kết hợp giữa các Toán Tử (Operator) và các Toán Hạng (Operand) theo đúng một trật tự nhất định. Trong đó mỗi Toán Hạng có thể là một Hằng, một Biến hoặc một Biểu Thức khác.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BlogPage = pageLayoutDefault(BlogComponent);
export default BlogPage;