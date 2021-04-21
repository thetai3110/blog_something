import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './summary.component.css';

const SummaryBlog = ({ blogInfo, setBlogInfo, location }) => {
    return (
        <textarea className="summary-blog"
            placeholder="Tóm tắt"
            defaultValue={location.pathname === '/blog/create' ? '' : blogInfo.summary}
            onChange={(e) => setBlogInfo({ ...blogInfo, summary: e.target.value })}></textarea>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryBlog));