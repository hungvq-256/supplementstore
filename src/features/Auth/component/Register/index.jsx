import React from 'react';
// import PropTypes from 'prop-types';
import RegisterForm from '../RegisterForm';

// Register.propTypes = {

// };

function Register(props) {
    // const dispatch = useDispatch();
    const handleSubmit = (values) => {
        // const requestSignUp = () => async dispatch => {
        //     try {
        //         let res = await userApi.register(values);
        //         let action = requestSignupAction(res);
        //         dispatch(action);
        //     }
        //     catch (error) {
        //         console.log(error);
        //     }
        // }
        // dispatch(requestSignUp());
        alert("This feature is not available right now, please sign in with your Google account")
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;