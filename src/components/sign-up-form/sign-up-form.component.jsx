import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component"

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetForm = () => {
        setFormFields();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('error message');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );

            await createAuthUserWithEmailAndPassword(user, { displayName });
            resetForm();

        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
        // const auth = authorization;

        // response.exists();

        // confirm passwords match
        // see if we authenticated user with email and password
        // create user document
        // pass displayName when you generate document from what you get back from authuserback
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword} 
                />

                <Button buttonType='inverted' type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm;