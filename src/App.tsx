import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import SideBar from "./components/SideBar";
import CalendarHeader from "./components/CalendarHeader";
import CalendarView from "./components/CalendarView";

function App() {
  return (
    <Provider store={store}>
      <CalendarHeader />
      <div className="flex h-screen flex-col items-center bg-white sm:flex-row sm:items-start">
        <SideBar />
        <CalendarView />
      </div>
    </Provider>
  );
}

export default App;
