import { requireRole } from '@/lib/api/userSession';
import React from 'react';

const AdminLayout =async ({children}) => {
      await requireRole('admin')
      return children;
};

export default AdminLayout;