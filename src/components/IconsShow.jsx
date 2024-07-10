export default function IconsShow({ player }) {
  switch (player) {
    case "X":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8em"
          height="8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray={12}
            strokeDashoffset={12}
            strokeLinecap="round"
            strokeWidth={2}
            d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.4s"
              values="12;0"
            ></animate>
          </path>
        </svg>
      );
    case "O":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8em"
          height="8em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray={60}
            strokeDashoffset={60}
            strokeLinecap="round"
            strokeWidth={2}
            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.5s"
              values="60;0"
            ></animate>
          </path>
        </svg>
      );
    default:
      return;
  }
}
