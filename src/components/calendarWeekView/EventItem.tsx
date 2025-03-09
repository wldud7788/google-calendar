import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/calendarSlice";
import { formatTimeToHHMM } from "../../utils/dateUtils";
import { CalendarEvent } from "../../types/calendar.types";
interface EventItemProps {
  event: CalendarEvent;
}

const EventItem = ({ event }: EventItemProps) => {
  const dispatch = useDispatch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("이 일정을 삭제하시겠습니까?")) {
      dispatch(deleteEvent(event.id));
    }
  };

  const startTime = formatTimeToHHMM(event.start);
  const endTime = formatTimeToHHMM(event.end);
  return (
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded border-l-4 border-blue-500 bg-blue-100 text-sm text-blue-800 hover:bg-blue-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-1">
        <div className="flex items-start justify-between">
          <div className="flex-1 truncate font-medium">{event.title}</div>
          <button
            onClick={handleDelete}
            className="ml-1 hidden flex-shrink-0 text-gray-500 hover:text-red-500 group-hover:block"
            aria-label="일정 삭제"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-1 text-xs text-gray-600">
          {startTime} - {endTime}
        </div>
      </div>
    </div>
  );
};
export default EventItem;
