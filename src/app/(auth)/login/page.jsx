
import React, { Suspense } from 'react';
import LoginForm from './LoginForm';


const LoginPage = () => {
    return (
          <Suspense fallback={<div>Loading...</div>}>
     <LoginForm></LoginForm>
    </Suspense>
    );
};

export default LoginPage;