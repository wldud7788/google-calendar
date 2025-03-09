import CalendarMonthViewTop from "./calendarMonthView/CalendarMonthViewTop";
import CalnedarMonthGrid from "./calendarMonthView/CalnedarMonthGrid";

const CalendarMonthView = () => {
  return (
    <div className="h-full overflow-auto">
      {/* 요일 헤더 */}
      <CalendarMonthViewTop />

      {/* 월 뷰 메인*/}
      <CalnedarMonthGrid />
    </div>
  );
};

export default CalendarMonthView;
