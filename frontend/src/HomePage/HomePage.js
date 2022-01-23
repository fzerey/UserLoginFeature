import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    
    componentDidMount() {
        this.props.getOnlineCount();
    }


    render() {
        const { user, users } = this.props;
        const role = user.user.role;
        const isAdmin = role === "role_admin";
        var pieces;
        let word;
        if(users.message){
            pieces = users.message.split('\n');
        }
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.user.firstName}!</h1>
                {isAdmin && pieces &&
                    <div> 
                        <div>
                            {pieces[0]}
                        </div>
                        <div>
                            {pieces[1]}
                        </div>
                        <div>
                            {pieces[2]}
                        </div>
                    </div>
                }
                <p>
                    <Link to="/login" onClick={() => {this.props.logout()}}>Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication, users} = state;
    const { user } = authentication;
    return { user, users};
}

const actionCreators = {
    getOnlineCount: userActions.getOnlineCount,
    logout: userActions.logout
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };