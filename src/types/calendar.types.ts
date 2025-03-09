export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // ISO 문자열 형식 (YYYY-MM-DDTHH:MM)
  end: string; // ISO 문자열 형식 (YYYY-MM-DDTHH:MM)
}

export interface CalendarState {
  events: CalendarEvent[];
  selectedDate: string; // ISO 문자열 형식 (YYYY-MM-DD)
  currentView: "week" | "month"; // 추후 day, month 등 확장 가능
  displayMonth: number;
  displayYear: number;
}

export type WeekDay = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
};

export type Week = WeekDay[];

export interface DayCell {
  date: Date;
  dateString: string;
  day: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}
