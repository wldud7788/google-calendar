import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import {
  navigateToNextWeek,
  navigateToPreviousWeek,
  navigateToToday,
  setCurrentView,
} from "../store/calendarSlice";
import { formatDateToReadable } from "../utils/dateUtils";
import ArrowButton from "./ui/ArrowButton";

const CalendarHeader = () => {
  const { selectedDate, currentView, displayMonth, displayYear } = useSelector(
    (state: RootState) => state.calendar,
  );
  const dispatch = useDispatch();

  // 월 이름 배열
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const currentMonth = monthNames[displayMonth];

  const handleViewChange = (view: "week" | "month") => {
    dispatch(setCurrentView(view));
  };

  const handlePreviousWeek = () => {
    dispatch(navigateToPreviousWeek());
  };

  const handleNextWeek = () => {
    dispatch(navigateToNextWeek());
  };

  const handleTodayClick = () => {
    dispatch(navigateToToday());
  };

  const displayDate = formatDateToReadable(new Date(selectedDate));
  return (
    <div className="flex items-center border-b p-4">
      <div className="flex items-center space-x-4">
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={handleTodayClick}
        >
          오늘
        </button>
        <div>
          <ArrowButton
            direction="left"
            onClick={handlePreviousWeek}
            label="이전 주"
            size="medium"
          />
          <ArrowButton
            direction="right"
            onClick={handleNextWeek}
            label="다음 주"
            size="medium"
          />
        </div>
        {/* 날짜 표시 */}
        <div className="text-xl font-semibold text-gray-800">{displayDate}</div>
        {/* 뷰 전환 버튼 */}
        <div className="flex items-center space-x-1 rounded-lg bg-gray-100 p-1">
          <button
            className={`rounded-md px-3 py-1 ${
              currentView === "week" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleViewChange("week")}
          >
            주
          </button>
          <button
            className={`rounded-md px-3 py-1 ${
              currentView === "month" ? "bg-white shadow" : ""
            }`}
            onClick={() => handleViewChange("month")}
          >
            월
          </button>
        </div>
      </div>
    </div>
  );
};
export default CalendarHeader;
