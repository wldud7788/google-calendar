import { useMemo } from "react";
import { CalendarEvent, Week, WeekDay } from "../../types/calendar.types";
import { formatDateToYYYYMMDD } from "../../utils/dateUtils";
import EventItem from "./EventItem";
interface EventWidthPosition extends CalendarEvent {
  startHour: number;
  endHour: number;
  durationHours: number;
  top: string; // 이벤트의 상단 위치(css값)
  height: string; // 이벤트의 높이(css값)
}
interface CalendarWeekViewTopProps {
  weekData: Week;
}
const CalendarWeekGrid = ({ weekData }: CalendarWeekViewTopProps) => {
  // 시간 슬롯 배열 생성(0시부터 23시까지, 총 24개)
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  // 셀 클릭 시 호출될 이벤트 핸들러
  const handleCellClick = (date: Date, hour: number) => {
    const formattedDate = formatDateToYYYYMMDD(date);

    const event = new CustomEvent("openEventModal", {
      detail: {
        date: formattedDate,
        time: `${hour.toString().padStart(2, "0")}:00`,
      },
    });
    window.dispatchEvent(event);
  };

  // 이벤트를 일자별로 정리하고 위치 정보 계산
  const eventsByDay = useMemo(() => {
    return weekData.map((day) => {
      const dayEvents = day.events.map((event) => {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);

        // 이벤트 시작 시간과 종료 시간을 소수점 형태로 계산(9시 30분 -> 9.5)
        const startHour = startDate.getHours() + startDate.getMinutes() / 60;
        const endHour = endDate.getHours() + endDate.getMinutes() / 60;
        const durationHours = endHour - startHour;

        return {
          ...event,
          startHour,
          endHour,
          durationHours,
          height: `${durationHours * 4}rem`, // 1시간 = 4rem (h-16)
          // 상단 위치: 시작 시간에 따라 위치 조정
          top: `${startHour * 4}rem`,
        } as EventWidthPosition;
      });

      // 해당 날짜의 이벤트 배열 반환
      return dayEvents;
    });
  }, [weekData]);
  return (
    <>
      {/* 시간 슬롯 */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-8 divide-x">
          {/* 시간 열 */}
          <div className="divide-y">
            {timeSlots.map((hour) => (
              // 각 시간 슬롯 (0시~23시)
              <div key={hour} className="relative h-16 pr-2">
                {/* 시간 텍스트 */}
                <span className="absolute -top-2 right-2 text-xs text-gray-500">
                  {hour}:00
                </span>
              </div>
            ))}
          </div>

          {/* 일정 그리드 - 각 요일별 시간 셀과 이벤트를 표시 */}
          {weekData.map((day: WeekDay, dayIndex: number) => (
            <div key={dayIndex} className="relative">
              {/* 시간 셀 배경 - 클릭 이벤트를 처리하는 영역 */}
              <div className="divide-y">
                {timeSlots.map((hour) => (
                  <div
                    key={hour}
                    className={`// 각 셀의 높이는 4rem(64px)입니다 h-16 ${
                      day.isToday ? "bg-blue-50" : ""
                    } // 오늘인 경우 배경색 변경 ${
                      !day.isCurrentMonth ? "bg-gray-50" : ""
                    } // 현재 월이 아닌 경우 배경색 변경 // 호버 시 배경색 변경 hover:bg-gray-100`}
                    onClick={() => handleCellClick(day.date, hour)}
                  ></div>
                ))}
              </div>

              {/* 이벤트 아이템들 */}
              <div className="pointer-events-none absolute inset-0 p-1">
                {eventsByDay[dayIndex].map((event) => (
                  <div
                    key={event.id}
                    className="pointer-events-auto absolute left-1 right-1 z-10"
                    style={{
                      top: event.top, // 이벤트 시작 시간에 따른 상단 위치
                      height: event.height, // 이벤트 지속 시간에 따른 높이
                    }}
                  >
                    <EventItem event={event} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CalendarWeekGrid;
