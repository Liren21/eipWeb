import { Routes, Route, Navigate } from 'react-router-dom';
import ChangePasswordForm from '../../../../core/components/change-password-form/ChangePasswordForm';
import CreateAccountForm from '../../../../core/components/create-account-form/CreateAccountForm';
import SingleCard from '../../../../core/components/layouts/single-card/single-card';
import LoginForm from '../../../../core/components/login-form/LoginForm';
import ResetPasswordForm from '../../../../core/components/reset-password-form/ResetPasswordForm';


export default function UnauthenticatedContent() {
    const data =[
        {
            path:'/login',
            element:  <LoginForm />,
            title:'Sign In',
            description:''
        },
        {
            path:'/create-account',
            element:  <CreateAccountForm />,
            title: "Sign Up",
            description:''
        },
        {
            path:'/reset-password',
            element:  <ResetPasswordForm />,
            title: "Reset Password",
            description:"Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
        },
        {
            path:'/change-password/:recoveryCode',
            element:  <ChangePasswordForm />,
            title: "Change Password",
            description:""
        },
    ]
  return (
    <Routes>
        {
            data.map((item)=>(
                <Route
                    path={item.path}
                    element={
                        <SingleCard description={item.description} title={item.title}>
                            {item.element}
                        </SingleCard>
                    }
                />
            ))
        }
      <Route path='*' element={<Navigate to={'/login'} />}></Route>
    </Routes>
  );
}
