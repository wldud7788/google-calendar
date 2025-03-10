import { useSelector } from "react-redux";
import CalendarWeekGrid from "./calendarWeekView/CalendarWeekGrid";
import CalendarWeekViewTop from "./calendarWeekView/CalendarWeekViewTop";
import { RootState } from "../store";
import { getWeekData } from "../utils/dateUtils";

const CalendarWeekView = () => {
  const { selectedDate, events } = useSelector(
    (state: RootState) => state.calendar,
  );
  // 현재 선택된 날짜의 주간 데이터
  const weekData = getWeekData(selectedDate, events);
  return (
    <>
      {/* 요일 헤더*/}
      <CalendarWeekViewTop weekData={weekData} />
      {/* 주간뷰 메인 */}
      <CalendarWeekGrid weekData={weekData} />
    </>
  );
};
export default CalendarWeekView;
