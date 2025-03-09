import {
  format,
  parseISO,
  addDays,
  subDays,
  startOfWeek,
  isSameMonth,
  isSameDay,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarEvent, Week, WeekDay } from "../types/calendar.types";

// 오늘 날짜 얻기
export const getToday = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};

// 날짜를 YYYY-MM-DD 형식으로 변환
export const formatDateToYYYYMMDD = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

// 날짜를 HH:MM 형식으로 변환
export const formatTimeToHHMM = (dateStr: string): string => {
  return format(parseISO(dateStr), "HH:mm");
};

// 날짜를 사람이 읽기 쉬운 형식으로 변환 (예: "2023년 10월 15일")
export const formatDateToReadable = (date: Date): string => {
  return format(date, "yyyy년 MM월 dd일");
};

// 날짜의 요일 이름 가져오기
export const getDayName = (date: Date): string => {
  return format(date, "E", { locale: ko });
};

// 주어진 날짜가 포함된 주의 시작일(일요일)을 반환
export const getWeekStart = (date: Date): Date => {
  return startOfWeek(date, { weekStartsOn: 0 }); // 0: 일요일부터 시작
};

// 주어진 날짜의 주 데이터 생성
export const getWeekData = (
  selectedDate: string,
  events: CalendarEvent[]
): Week => {
  const today = new Date();
  const date = parseISO(selectedDate);
  const weekStart = getWeekStart(date);

  const week: Week = [];

  // 일주일(7일) 데이터 생성
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(weekStart, i);
    const dateStr = formatDateToYYYYMMDD(currentDate);

    // 해당 날짜의 이벤트 필터링
    const dayEvents = events.filter((event) => {
      const eventDate = format(parseISO(event.start), "yyyy-MM-dd");
      return eventDate === dateStr;
    });

    const weekDay: WeekDay = {
      date: currentDate,
      isCurrentMonth: isSameMonth(currentDate, parseISO(selectedDate)),
      isToday: isSameDay(currentDate, today),
      events: dayEvents,
    };

    week.push(weekDay);
  }

  return week;
};

// 이전 주 날짜 가져오기
export const getPreviousWeek = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return formatDateToYYYYMMDD(subDays(date, 7));
};

// 다음 주 날짜 가져오기
export const getNextWeek = (dateStr: string): string => {
  const date = parseISO(dateStr);
  return formatDateToYYYYMMDD(addDays(date, 7));
};

// 시간 포맷 변환 (예: "09:30" -> "2023-10-15T09:30:00")
export const formatTimeToISO = (dateStr: string, timeStr: string): string => {
  const [hours, minutes] = timeStr.split(":");
  let date = parseISO(dateStr);

  date = setHours(date, parseInt(hours, 10));
  date = setMinutes(date, parseInt(minutes, 10));
  date = setSeconds(date, 0);
  date = setMilliseconds(date, 0);

  return date.toISOString();
};
