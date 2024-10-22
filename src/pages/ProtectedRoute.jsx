import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { auth } from "../config/Firebase";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!auth.currentUser) navigate("/");
    },
    [navigate]
  );
  return auth.currentUser ? children : null;
}

export default ProtectedRoute;
