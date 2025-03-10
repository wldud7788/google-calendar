import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { formatTimeToISO } from "../utils/dateUtils";
import { addEvent } from "../store/calendarSlice";
import CloseButton from "./ui/CloseButton";
import Button from "./ui/Button";

interface EventModalProps {
  date: string;
  initialTime?: string; // 초기 시간값 (HH:MM 형식)
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  date,
  initialTime = "09:00",
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState(initialTime);
  const [endTime, setEndTime] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // 초기 종료 시간 설정 (시작 시간 + 1시간)
  useEffect(() => {
    if (startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const endHour = (hours + 1) % 24;
      setEndTime(
        `${endHour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`,
      );
    }
  }, [startTime]);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 입력 필드를 초기화
      setTitle("");
      setStartTime(initialTime);

      // 첫 번째 입력 필드에 포커스
      const titleInput = document.getElementById("event-title");
      if (titleInput) {
        titleInput.focus();
      }
    }
  }, [isOpen, initialTime]);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    const event = {
      id: uuidv4(),
      title: title.trim(),
      start: formatTimeToISO(date, startTime),
      end: formatTimeToISO(date, endTime),
    };

    dispatch(addEvent(event));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">일정 추가</h2>
          <CloseButton onClose={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="event-title"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              제목
            </label>
            <input
              type="text"
              id="event-title"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="일정 제목"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start-time"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                시작 시간
              </label>
              <input
                type="time"
                id="start-time"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="end-time"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                종료 시간
              </label>
              <input
                type="time"
                id="end-time"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 border-t pt-3">
            <Button variant="cancel" onClick={onClose}>
              취소1
            </Button>
            <Button variant="primary" type="submit">
              저장
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
