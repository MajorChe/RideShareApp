import UserContext from "./components/hooks/AccountContext";
import Views from "./components/Views";
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <UserContext>
      <CookiesProvider>
        <Views />
      </CookiesProvider>,
    </UserContext>
  );
}

export default App;