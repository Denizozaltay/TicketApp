type CheckPageProps = {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  ["data-id"]?: string; // optional custom attribute
};

export default function DataTableButton({
  name,
  onClick,
  className,
  ["data-id"]: dataId, // destructure it to use in JSX
}: CheckPageProps) {
  return (
    <button
      name={name}
      data-id={dataId}
      onClick={onClick}
      className={className}
    >
      {name}
    </button>
  );
}
