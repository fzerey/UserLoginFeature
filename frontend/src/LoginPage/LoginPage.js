import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        /*if(localStorage.getItem("user")){
            this.props.logout();
        }*/

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }

    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="container">
                <h2 className='text-center'>Login</h2>
                <form name="form-control" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block text-danger">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        <Link to="/retrieve" className='btn btn-link'>Forgot Password</Link>
                        {submitted && !password &&
                            <div className="help-block text-danger">Password is required</div>
                        }
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" disabled={loggingIn}>
                        {loggingIn &&
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        }
                        Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>

                        <Link to="/verify" className="btn btn-link">Verify Your Account</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };