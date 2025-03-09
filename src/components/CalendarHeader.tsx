import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import {
  navigateToNextWeek,
  navigateToPreviousWeek,
  navigateToToday,
} from "../store/calendarSlice";
import { formatDateToReadable } from "../utils/dateUtils";
import ArrowButton from "./ui/ArrowButton";

const CalendarHeader = () => {
  const { selectedDate } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch();

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
    <div className="flex items-center p-4 border-b">
      <div className="flex items-center space-x-4">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
      </div>
    </div>
  );
};
export default CalendarHeader;
