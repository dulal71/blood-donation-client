
import React, { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

const RegistrationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
         <RegistrationForm></RegistrationForm>   
        </Suspense>
    );
};

export default RegistrationPage;