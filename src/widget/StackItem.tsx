interface Props {
  name: string;
  active: boolean;
  onClick: () => void;
}

export function StackItem({ name, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        borderRadius: 10,
        border: active ? "2px solid #2563eb" : "1px solid #ccc",
        background: "#f9fafb",
      }}
    >
      {name}
    </button>
  );
}
