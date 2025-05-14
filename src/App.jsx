import { BrowserRouter as Router } from "react-router-dom";

import { MessageProvider } from "./contexts/Message/OpenMessage";
import { RoutesProtect } from "./contexts/Routes/RoutesValidation";
import { AuthProvider } from "./contexts/Auth/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MessageProvider>
          <RoutesProtect />
        </MessageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
