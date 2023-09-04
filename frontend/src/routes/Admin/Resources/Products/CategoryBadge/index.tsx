import "./styles.css";

type Props = {
  name: string;
};

export default function CategoryBadge({ name }: Props) {
  return (
    <div className="rounded text-dark fw-bold text-center p-2 me-2 mb-2 category-badge">
      {name}
    </div>
  );
}
