import { useSelector } from "react-redux";
import { RootState } from "../store";
import EventModal from "./EventModal";
import { useEffect, useState } from "react";
import CalendarMonthView from "./CalendarMonthView";
import CalendarWeekView from "./CalendarWeekView";

const CalendarView = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventDate, setEventDate] = useState<string>("");
  const [eventTime, setEventTime] = useState<string>("09:00");

  const { selectedDate, currentView } = useSelector(
    (state: RootState) => state.calendar,
  );

  useEffect(() => {
    // 전역 이벤트 리스너 설정
    const handleOpenEventModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setEventDate(customEvent.detail.date || selectedDate);
      setEventTime(customEvent.detail.time || "09:00");
      setIsEventModalOpen(true);
    };

    window.addEventListener("openEventModal", handleOpenEventModal);

    return () => {
      window.removeEventListener("openEventModal", handleOpenEventModal);
    };
  }, [selectedDate]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full flex-col">
        {currentView === "week" ? (
          <>
            <CalendarWeekView />
          </>
        ) : (
          <CalendarMonthView />
        )}
        {/* 이벤트 모달 */}
        <EventModal
          date={eventDate}
          initialTime={eventTime}
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
        />
      </div>
    </div>
  );
};
export default CalendarView;
