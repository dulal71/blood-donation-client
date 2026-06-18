import RegistrationForm from '@/component/RegistrationFrom';
import React, { Suspense } from 'react';

const RegistrationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
         <RegistrationForm></RegistrationForm>   
        </Suspense>
    );
};

export default RegistrationPage;