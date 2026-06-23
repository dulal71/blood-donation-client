import { requireRole } from '@/lib/api/userSession';
import React from 'react';

const VolunteerDashboard =async ({children}) => {
   await requireRole('volunteer')
   return children;
};

export default VolunteerDashboard;