import { useDispatch } from "react-redux";
import { CalendarEvent, DayCell } from "../../types/calendar.types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDateToYYYYMMDD } from "../../utils/dateUtils";
import { useMemo } from "react";
import { setSelectedDate } from "../../store/calendarSlice";
import EventItem from "../calendarWeekView/EventItem";

const CalnedarMonthGrid = () => {
  const dispatch = useDispatch();
  const { events, displayMonth, displayYear } = useSelector(
    (state: RootState) => state.calendar,
  );

  // 현재 날짜 정보
  const today = new Date();
  const todayString = formatDateToYYYYMMDD(today);

  // 특정 날짜의 이벤트 필터링
  const filterEventsForDate = (
    allEvents: CalendarEvent[],
    dateString: string,
  ) => {
    return allEvents.filter((event) => {
      const eventDate = new Date(event.start).toDateString();
      return new Date(dateString).toDateString() === eventDate;
    });
  };

  // 월별 그리드 데이터 생성
  const monthGrid = useMemo(() => {
    const firstDayOfMonth = new Date(displayYear, displayMonth, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

    // 이전 달의 마지막 날짜들
    const daysInPrevMonth = new Date(displayYear, displayMonth, 0).getDate();

    // 6주 * 7일 그리드
    const days: DayCell[][] = [];
    let dayCounter = 1;
    let currentMonthComplete = false;
    let nextMonthCounter = 1;

    // 6주 그리드 생성
    for (let week = 0; week < 6; week++) {
      const weekRow: DayCell[] = [];

      // 7일 (일요일부터 토요일까지)
      for (let day = 0; day < 7; day++) {
        let currentDate: Date;
        let isCurrentMonth = true;
        let dayNumber: number;

        // 첫 주이고 아직 첫날에 도달하지 않은 경우(이전 달의 날짜)
        if (week === 0 && day < startingDayOfWeek) {
          dayNumber = daysInPrevMonth - (startingDayOfWeek - day - 1);
          currentDate = new Date(displayYear, displayMonth - 1, dayNumber);
          isCurrentMonth = false;
        }

        // 현재 달의 날짜가 끝난 경우 (다음 달의 날짜)
        else if (currentMonthComplete) {
          dayNumber = nextMonthCounter++;
          currentDate = new Date(displayYear, displayMonth + 1, dayNumber);
          isCurrentMonth = false;
        }

        // 현재 달의 날짜
        else {
          dayNumber = dayCounter++;
          currentDate = new Date(displayYear, displayMonth, dayNumber);

          // 현재 달의 마지막 날짜에 도달했는지 확인
          if (dayCounter > daysInMonth) {
            currentMonthComplete = true;
          }
        }

        const dateString = formatDateToYYYYMMDD(currentDate);

        // 해당 날짜의 이벤트 필터링
        const dayEvents = filterEventsForDate(events, dateString);

        weekRow.push({
          date: currentDate,
          dateString,
          day: dayNumber,
          isToday: dateString === todayString,
          isCurrentMonth,
          events: dayEvents,
        });
      }

      days.push(weekRow);
    }
    return days;
  }, [displayMonth, displayYear, events, todayString]);

  // 일정 추가 핸들러
  const handleAddEvent = (dateString: string) => {
    // 이벤트 추가 모달 열기
    const event = new CustomEvent("openEventModal", {
      detail: {
        date: dateString,
        time: "09:00",
      },
    });
    window.dispatchEvent(event);
  };

  const handleDateClick = (dateString: string) => {
    dispatch(setSelectedDate(dateString));
    handleAddEvent(dateString);
  };
  return (
    <div className="flex-1">
      {monthGrid?.map((week, idx) => (
        <div key={idx} className="grid grid-cols-7 border-b">
          {week.map((day, idx) => (
            <div
              key={idx}
              className={`relative min-h-[100px] border-r p-1 ${
                !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
              } ${day.isToday ? "bg-blue-50" : ""}`}
              onClick={() => handleDateClick(day.dateString)}
            >
              {/* 날짜 표시 */}
              <div className="flex justify-between">
                <span
                  className={`inline-block h-6 w-6 rounded-full text-center ${
                    day.isToday ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {day.day}
                </span>
              </div>

              {/* 이벤트 목록 */}
              <div className="mt-1 space-y-1">
                {day.events.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default CalnedarMonthGrid;
