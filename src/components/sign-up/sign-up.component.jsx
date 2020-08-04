import React from 'react';
import FormInput from'../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
class signUp extends React.Component{
    constructor(){
        super();

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:'',
        };
    }
    handlesubmit=async event=>{
        event.preventDefault();
        const {displayName,email,password,confirmPassword}=this.state;
        if(password!==confirmPassword)
        {
            alert("passwords don't match");
            return;
        }
        try {
            const{user}=await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});

            this.setState({
                displayName:'',
                email:'',
                password:'',
                confirmPassword:'',
            });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange=event=>{
        const {name,value}=event.target;
        this.setState({[name]:value});
    }
    render(){
        const {displayName,email,password,confirmPassword}=this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handlesubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        placeholder='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        placeholder='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        placeholder='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        placeholder='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </div>
        )
    }
}

export default signUp;