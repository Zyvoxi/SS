import { Navigate, useParams } from "react-router-dom";

const RedirectToProfile = () => {
  const { uuid } = useParams();
  return <Navigate to={`/SS/user/${uuid}/profile`} replace={true} />;
};

export default RedirectToProfile;
