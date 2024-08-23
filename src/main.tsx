import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import "./style.scss";
import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
