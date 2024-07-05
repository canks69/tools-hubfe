import {createBrowserRouter} from "react-router-dom";
import {Layouts} from "../layouts/layouts";
import {InvoiceMaker} from "../pages/invoice/invoice-maker";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layouts />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: '/',
        element: <InvoiceMaker />
      }
    ]
  }
]);