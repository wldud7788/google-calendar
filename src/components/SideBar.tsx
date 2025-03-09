import AddScheduleButton from "./sidebar/AddScheduleButton";
import MiniCalendar from "./sidebar/MiniCalendar";

const SideBar = () => {
  return (
    <div className="w-64 flex-1 border-r p-4 md:flex-none">
      <div className="mb-6">
        <AddScheduleButton />
      </div>
      <div className="mb-6">
        <MiniCalendar />
      </div>
    </div>
  );
};

export default SideBar;
