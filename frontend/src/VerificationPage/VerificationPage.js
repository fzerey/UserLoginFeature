import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            code: '',
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
        const { email, code } = this.state;
        if (email && code) {
            this.props.verify(email, code);
        }
    }

    render() 
    {
        const { verifying } = this.props;
        const { email, code, submitted } = this.state;
        return (
            <div className="container">
                <h2 className='text-center'>Verify</h2>
                <form name="form-control" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block text-danger">Email is required</div>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="code">Code</label>
                        <input type="text" className="form-control" name="code" value={code} onChange={this.handleChange} />
                        {submitted && !code &&
                            <div className="help-block text-danger">Verification code is required</div>
                        }
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" disabled={verifying} >
                        {verifying &&
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        }
                        Verify</button>
                        <div>
                            <Link to="/login" className="btn btn-link">Login</Link>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                        
                    </div>
                    
                    
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { verifying } = state.verification;
    return { verifying };
}

const actionCreators = {
    verify: userActions.verify
};

const connectedVerificationPage = connect(mapState, actionCreators)(VerificationPage);
export { connectedVerificationPage as VerificationPage };