import { dayLabels } from "../../constants/dateConstants";

const CalendarMonthViewTop = () => {
  return (
    <div className="grid grid-cols-7 border-b bg-gray-50">
      {dayLabels.map((day, index) => (
        <div key={index} className="py-2 text-center font-medium">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarMonthViewTop;
