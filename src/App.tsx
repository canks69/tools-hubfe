import {StrictMode} from "react";
import {HelmetProvider} from "react-helmet-async";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes/base-router.tsx";

function App() {

  return (
    <StrictMode>
      <HelmetProvider>
        <RouterProvider router={router}/>
      </HelmetProvider>
    </StrictMode>
  )
}

export default App
