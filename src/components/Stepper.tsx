type StepperProps = {
  location: string;
  updatedAt: Date;
  status: string;
};


export function StepperActive({ location, updatedAt, status }: StepperProps) {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
        <svg
          className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      </span>
      <h3 className="font-medium leading-tight">{location} </h3>
      <p className="text-sm">
        {new Date(updatedAt).toLocaleTimeString("vi-VN")} {" - "}
        {new Date(updatedAt).toLocaleDateString("vi-VN")}
        {/* Hiển thị giờ */}
      </p>
    </li>
  );
}
