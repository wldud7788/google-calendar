import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { navigateToMonth, setSelectedDate } from "../../store/calendarSlice";
import { formatDateToYYYYMMDD } from "../../utils/dateUtils";
import ArrowButton from "../ui/ArrowButton";
import { dayLabels } from "../../constants/dateConstants";

const MiniCalendar = () => {
  const { selectedDate, displayMonth, displayYear } = useSelector(
    (state: RootState) => state.calendar,
  );

  const dispatch = useDispatch();

  // 특정 연도와 월의 총 일수를 계산하는 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 특정 연도와 월의 첫 번째 날의 요일을 가져오는 함수
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // 이전 달로 이동하는 함수
  const handlePrevMonth = () => {
    let newMonth = displayMonth - 1;
    let newYear = displayYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }

    dispatch(navigateToMonth({ year: newYear, month: newMonth }));
  };

  // 다음 달로 이동하는 함수
  const handleNextMonth = () => {
    let newMonth = displayMonth + 1;
    let newYear = displayYear;

    if (newMonth > 11) {
      newMonth = 0; // 1월
      newYear += 1;
    }
    dispatch(navigateToMonth({ year: newYear, month: newMonth }));
  };

  // 날짜를 클릭했을 때 선택된 날짜를 업데이트 하는 함수
  const handleDateClick = (day: number) => {
    const newDate = new Date(displayYear, displayMonth, day);
    dispatch(setSelectedDate(formatDateToYYYYMMDD(newDate)));
  };

  // 달력 그리드를 생성하는 함수
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const firstDayOfMonth = getFirstDayOfMonth(displayYear, displayMonth);

    const today = new Date();
    const currentSelectedDate = new Date(selectedDate);

    const days = [];

    // 이전 달의 날짜를 계산
    const prevMonth = displayMonth === 0 ? 11 : displayMonth - 1;
    const prevYear = displayMonth === 0 ? displayYear - 1 : displayYear;
    const prevMonthDays = getDaysInMonth(prevYear, prevMonth);

    // 달력의 첫 주에 이전 달의 날짜를 채움
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <div
          key={`prev-${i}`}
          className="hvoer:bg-gray-100 cursor-pointer p-1 text-center text-xs text-gray-400"
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>,
      );
    }
    // 현재 달의 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === displayMonth &&
        today.getFullYear() === displayYear;

      const isSelected =
        currentSelectedDate.getDate() === day &&
        currentSelectedDate.getMonth() === displayMonth &&
        currentSelectedDate.getFullYear() === displayYear;

      // 현재 달의 날짜 요소를 생성하여 배열에 추가
      days.push(
        <div
          key={`current-${day}`}
          className={`cursor-pointer p-1 text-center text-xs ${
            isToday ? "font-bold" : ""
          } ${
            isSelected
              ? "rounded-full bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>,
      );
    }
    // 다음 달의 날짜로 나머지 칸 채우기
    const totalDays = days.length;
    const nextMonth = displayMonth === 11 ? 0 : displayMonth + 1;
    const nextYear = displayMonth === 11 ? displayYear + 1 : displayYear;

    // 6주 * 7일 42칸으로 달력 구성
    const remainingCells = 42 - totalDays;

    // 다음 달의 날짜를 추가
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div
          key={`next-${day}`}
          className="cursor-pointer p-1 text-center text-xs text-gray-400 hover:bg-gray-100"
          onClick={() => {
            // 다음 달 날짜 클릭 시 해당 날짜로 이동
            const date = new Date(nextYear, nextMonth, day);
            dispatch(setSelectedDate(formatDateToYYYYMMDD(date)));
          }}
        >
          {day}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-2 flex items-center justify-between">
        {/* 현재 표시 중인 연도와 월 */}
        <div className="font-semibold">
          {`${displayYear}년 ${displayMonth + 1}월`}
        </div>
        {/* 이전/다음 달 이동 버튼 */}
        <div className="flex items-center space-x-1">
          <ArrowButton
            direction="left"
            onClick={handlePrevMonth}
            label="이전 달"
            size="small"
          />
          <ArrowButton
            direction="right"
            onClick={handleNextMonth}
            label="다음 달"
            size="small"
          />
        </div>
      </div>
      {/* 달력 날짜 표시 */}
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((day) => (
          <div key={day} className="p-1 text-center text-xs font-medium">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};
export default MiniCalendar;
