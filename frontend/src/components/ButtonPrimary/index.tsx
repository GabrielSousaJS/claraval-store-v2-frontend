import "./styles.css";

type Props = {
  text: string;
};

export function ButtonPrimary({ text }: Props) {
  return (
    <button className="btn btn-primary text-light p-3 button-primary">
      <h6 className="text-uppercase">{text}</h6>
    </button>
  );
}
