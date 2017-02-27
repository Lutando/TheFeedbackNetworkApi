import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPostRoll } from '../actions/postRoll';
import * as types from '../constants/PrincipleTypes';
import { Link } from 'react-router-dom';

class PostRoll extends React.Component {

    componentWillMount() {
    }

    componentWillUpdate() {
        const { dispatch, user, token } = this.props;

        if(!this.props.postRollFetched) {
            if(this.props.principleType == types.UNAUTHORIZED) {
            //no token display something 
            }
            if(this.props.principleType == types.STANDARD_USER) {
                dispatch(fetchPostRoll(0,5,null,user.access_token))
            }
            if(this.props.principleType == types.BASIC) { 
                dispatch(fetchPostRoll(0,5,null, token))
            }
        }
        
        
    }

    render() {
        
        var component = <div> Loading </div>

        if(!this.props.postRollFetched)
        {
            //get enumeration of posts
            component = <div> posts not fetched yet </div>
        }
        if(this.props.postRollFetchFailed)
        {
            component = <div> Failed to fetch posts </div>
        }
        if(this.props.postRollFetchingInProgress)
        {
            component = <div> Loading </div>
        }
        if(this.props.postRollFetched)
        {
            component = <div> {JSON.stringify(this.props.postRoll)} 
                <Link to='bob/fdc7eadc-1450-41ef-b886-107ccb90759d'> bob </Link>
            </div>
        }

        return (
            <div>
                {component}
            </div>
        )
    }
}

PostRoll.PropTypes = {
    dispatch: PropTypes.func.isRequired,
    postRoll: PropTypes.array.isRequired,
    postRollFetchFailed: PropTypes.bool.isRequired,
    postRollFetchingInProgress: PropTypes.bool.isRequired,
    postRollFetched: PropTypes.bool.isRequired,
    postRoll: PropTypes.array,
    user: PropTypes.object.isRequired,
    principleType: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
}

function mapStateToProps(state) {
    const { postRoll, postRollFetchFailed, 
            postRollFetchingInProgress, 
            postRollFetched, errorMessage, } = state.postRoll;
    const { token, principleType } = state.token;
    const { user } = state.auth;

    return {
        postRoll,
        postRollFetchFailed,
        postRollFetchingInProgress,
        postRollFetched,
        postRoll,
        errorMessage,
        token,
        principleType,
        user
    }
}

export default connect(mapStateToProps)(PostRoll);