import { Navigate } from 'react-router-dom';

// Redirect /contact/media to /insights/press
export default function MediaContact() {
  return <Navigate to="/insights/press" replace />;
}
