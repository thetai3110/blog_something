import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { StyledTextarea } from '../../../../components/common/common-styled.component';
import { setBlogInfo } from '../../../../redux/blog/blog_actions';

const SummaryBlog = ({ blogInfo, setBlogInfo, location }) => {
    return (
        <StyledTextarea
            placeholder="Tóm tắt"
            defaultValue={location.pathname === '/blog/create' ? '' : blogInfo.summary}
            onChange={(e) => setBlogInfo({ ...blogInfo, summary: e.target.value })}></StyledTextarea>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo,
})

const mapDispatchToProps = dispatch => ({
    setBlogInfo: blogInfo => dispatch(setBlogInfo(blogInfo)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryBlog));