var classnames = require('classnames');
var router = require('react-router');
var Navigation = router.Navigation;

require('../../../utils/Polyfills');
var RequestType = require('../../../constants/RequestType');
var { Row, Col, ImageFadeIn } = require('../../../components/Sky/');

require('./LinkSet.less');
require('./DesignReviewList.less');
var Review = require('./Review');
var ReviewApproval = require('./ReviewApproval');




var DesignReviewList = React.createClass({
    displayName: 'DesignReviewList',


    // Mixins
    mixins: [Navigation],
    contextTypes: {
        router: React.PropTypes.func,
    },




    // Props
    propTypes: {
    },
    getDefaultProps: function() {
        return {
        };
    },
    // State
    getInitialState: function() {
        return {
        };
    },




    getTargets: function() {
        return this.findBySlug();
    },
    findBySlug: function() {
        var params = this.props.params;
        var slug = params.rSlug;
        var selectedReview;

        if(slug) {
            selectedReview = this.props.project.reviews.find(function(item) {
                return item.__slug === params.rSlug;
            });
        }
        var result = {selectedReview: selectedReview};
        return result;
    },
    loadReviews: function() {
        var revList = this.props.reviews;
        revList = revList.sort(function(a, b) {
            if(a.createdDate == b.createdDate) {
                return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0;
            } else {
                return (a.createdDate < b.createdDate) ? -1 : 1;
            }
        });

        revList = revList.map(function(item, i) {
            var icon = null;
            switch(item.requestType) {
                case RequestType.REVISION: {
                    icon = 'repeat';
                    break;
                }
                case RequestType.DELIVERABLES: {
                    icon =  !!item.approvedDate ? 'export' : 'alert';
                    break;
                }
                default: {
                    icon = 'alert';
                    break;
                }
            }
            var cssNames = classnames('glyphicon', 'glyphicon-' + icon, {
                'invalid': icon === 'alert',
                'faded': icon !== 'alert',
            });

            return (
                <div key={i} className='item'>
                    <div className='icon'><i className={cssNames} /></div>
                    <a href="#" className='link' data-path={item.__path} onClick={this.handleClick}>{item.title}</a>
                </div>
            );
        }.bind(this));

        this.setState({
            revList: revList,
        })
    },




    // Mount
    componentWillMount: function() {
        this.setState(this.getTargets());
        this.loadReviews();
    },
    componentDidMount: function() {
    },
    componentWillUnmount: function() {
    },




    // Updates
    componentWillReceiveProps: function(nextProps) {
        this.setState(this.getTargets());
        this.loadReviews();
    },
    componentWillUpdate: function(nextProps, nextState) {
    },
    componentDidUpdate: function() {
    },




    // render
    render: function() {
        var revList = this.state.revList;
        if(!revList || !revList.length) {
            return (this.renderNoReviews());
        }
        var acct = this.props.targets.selectedAccount;
        var prj = this.props.project;
        var rev = this.state.selectedReview;

        // determine if we should show either the Review or ReviewApproval popup
        var popup = !rev ? null
                         : rev.__showApproval ? <ReviewApproval account={acct} project={prj} review={rev} user={this.props.user} />
                                              : <Review project={prj} review={rev} user={this.props.user} />

        return (
            <div id='design-review-list' {...this.props} className='link-set'>
                <h3 className='title'>Design Reviews</h3>
                {revList}
                {popup}
            </div>
        );
    },
    renderNoReviews: function() {
        return (
            <div id='design-review-list' {...this.props} className='link-set'>
                <h3 className='title'>Design Reviews</h3>
                <div className='no-items'><span className='link'>no reviews found...</span></div>
            </div>
        );
    },




    handleClick: function(e) {
        e.preventDefault();

        var path = e.target.getAttribute('data-path');
        this.transitionTo(path);
    },

});
