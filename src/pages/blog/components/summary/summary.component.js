import { connect } from 'react-redux';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';
import './summary.component.css';

const SummaryBlog = ({blogInfo, setBlogInfo}) => {
    return (
        <textarea className="summary-blog" placeholder="Tóm tắt" onChange={(e) => setBlogInfo({ ...blogInfo, summary: e.target.value })}></textarea>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SummaryBlog);