import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToday } from "../utils/dateUtils";
import { CalendarEvent, CalendarState } from "../types/calendar.types";

// 초기 상태
const initialState: CalendarState = {
  events: [],
  selectedDate: getToday(),
  currentView: "week",
  displayMonth: new Date().getMonth(),
  displayYear: new Date().getFullYear(),
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },

    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload,
      );
    },

    setSelectedDate: (state, action: PayloadAction<string>) => {
      const date = new Date(action.payload);
      state.selectedDate = action.payload;

      // 표시 월과 년도도 함께 업데이트
      state.displayMonth = date.getMonth();
      state.displayYear = date.getFullYear();
    },

    // 이전 주/월 로 이동
    navigateToPreviousWeek: (state) => {
      if (state.currentView === "week") {
        const date = new Date(state.selectedDate);
        date.setDate(date.getDate() - 7);
        state.selectedDate = date.toISOString().split("T")[0];
        state.displayMonth = date.getMonth();
        state.displayYear = date.getFullYear();
      } else {
        let newMonth = state.displayMonth - 1;
        let newYear = state.displayYear;

        if (newMonth < 0) {
          newMonth = 11;
          newYear -= 1;
        }

        state.displayMonth = newMonth;
        state.displayYear = newYear;

        // 해당 월의 1일로 선택된 날짜 변경
        const newDate = new Date(newYear, newMonth, 1);
        state.selectedDate = newDate.toISOString().split("T")[0];
      }
    },

    // 다음 주/월 로 이동
    navigateToNextWeek: (state) => {
      if (state.currentView === "week") {
        const date = new Date(state.selectedDate);
        date.setDate(date.getDate() + 7);
        state.selectedDate = date.toISOString().split("T")[0];
        state.displayMonth = date.getMonth();
        state.displayYear = date.getFullYear();
      } else {
        let newMonth = state.displayMonth + 1;
        let newYear = state.displayYear;

        if (newMonth > 11) {
          newMonth = 0;
          newYear += 1;
        }

        state.displayMonth = newMonth;
        state.displayYear = newYear;

        const newDate = new Date(newYear, newMonth, 1);
        state.selectedDate = newDate.toISOString().split("T")[0];
      }
    },

    // 오늘로 이동
    navigateToToday: (state) => {
      const today = new Date();
      state.selectedDate = today.toISOString().split("T")[0];
      state.displayMonth = today.getMonth();
      state.displayYear = today.getFullYear();
    },

    // 특정 년월로 이동
    navigateToMonth: (
      state,
      action: PayloadAction<{ month: number; year: number }>,
    ) => {
      state.displayYear = action.payload.year;
      state.displayMonth = action.payload.month;
    },

    // 캘린더 뷰 변경
    setCurrentView: (state, action: PayloadAction<"week" | "month">) => {
      state.currentView = action.payload;
    },
  },
});

export const {
  addEvent,
  deleteEvent,
  setSelectedDate,
  navigateToPreviousWeek,
  navigateToNextWeek,
  navigateToToday,
  navigateToMonth,
  setCurrentView,
} = calendarSlice.actions;

export default calendarSlice.reducer;
