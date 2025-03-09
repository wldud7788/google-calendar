type Direction = "left" | "right";
type Size = "small" | "medium";

interface ArrowButtonProps {
  direction: Direction;
  onClick: () => void;
  label: string;
  size: Size;
  className?: string;
}

const ArrowButton = ({
  direction,
  onClick,
  label,
  size = "medium", // 'small' 또는 'medium' 옵션
  className = "",
}: ArrowButtonProps) => {
  // 크기에 따른 스타일 설정
  const sizeStyles = {
    small: {
      padding: "p-1",
      iconSize: "h-4 w-4",
    },
    medium: {
      padding: "p-2",
      iconSize: "h-5 w-5",
    },
  };

  const { padding, iconSize } = sizeStyles[size];

  return (
    <button
      className={`${padding} text-gray-600 hover:bg-gray-100 rounded-full ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d={
            direction === "left"
              ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          }
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
