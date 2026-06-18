import LoginForm from '@/component/LoginForm';
import React, { Suspense } from 'react';

const LoginPage = () => {
    return (
          <Suspense fallback={<div>Loading...</div>}>
     <LoginForm></LoginForm>
    </Suspense>
    );
};

export default LoginPage;