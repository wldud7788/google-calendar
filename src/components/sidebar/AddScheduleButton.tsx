import { useSelector } from "react-redux";
import { RootState } from "../../store";

const AddScheduleButton = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.calendar.selectedDate,
  );

  return (
    <button
      className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      onClick={() => {
        const event = new CustomEvent("openEventModal", {
          detail: { date: selectedDate },
        });
        window.dispatchEvent(event);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1 h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      일정 만들기
    </button>
  );
};
export default AddScheduleButton;
