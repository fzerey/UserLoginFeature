import { slotFlagsText } from '@vue/shared';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';

class RetrievePasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
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
        const { email} = this.state;
        if (email) {
            this.props.retrievePassword(email);
        }
    }

    render() 
    {
        const { retrieving } = this.props;
        const { email, submitted } = this.state;
        console.log(retrieving);
        return (
            <div className="container">
                <h2 className='text-center'>Retrieve Password</h2>
                <form name="form-control" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {submitted && !email &&
                            <div className="help-block text-danger">Email is required</div>
                        }
                    </div>
                    <div className="form-group text-center">
                        <button className="btn btn-primary" disabled={retrieving} >     
                            {retrieving &&
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            }Retrieve
                            
                        </button>
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
    const { retrieving } = state.retrieval;
    return { retrieving };
}

const actionCreators = {
    retrievePassword: userActions.retrievePassword
};

const connectedRetrievePasswordPage = connect(mapState, actionCreators)(RetrievePasswordPage);
export { connectedRetrievePasswordPage as RetrievePasswordPage };