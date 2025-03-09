import { Week } from "../../types/calendar.types";
import { getDayName } from "../../utils/dateUtils";

interface CalendarWeekViewTopProps {
  weekData: Week;
}
const CalendarWeekViewTop = ({ weekData }: CalendarWeekViewTopProps) => {
  return (
    <div className="grid grid-cols-8 border-b">
      <div className="py-2 text-center font-medium border-r"></div>
      {weekData.map((day, index) => {
        // 주말 여부 확인 (0 = 일요일, 6 = 토요일)
        const isWeekend = index === 0 || index === 6;
        const dayName = getDayName(day.date);
        const dayOfMonth = day.date.getDate();

        return (
          <div
            key={index}
            className={`py-2 text-center font-medium border-r last:border-r-0 
                ${day.isToday ? "bg-blue-50" : ""} 
                ${isWeekend ? "text-red-500" : "text-gray-700"}
                ${!day.isCurrentMonth ? "text-gray-400" : ""}
                `}
          >
            {/* 요일 및 날짜 */}
            <div>{dayName}</div>
            <div
              className={`${
                day.isToday
                  ? "bg-blue-500 text-white w-8 h-8 rounded-full justify-center inline-flex items-center"
                  : ""
              }`}
            >
              {dayOfMonth}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CalendarWeekViewTop;
