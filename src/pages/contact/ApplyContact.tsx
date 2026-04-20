import { Navigate } from 'react-router-dom';

// Redirect /contact/apply to /maverick/apply
export default function ApplyContact() {
  return <Navigate to="/maverick/apply" replace />;
}
