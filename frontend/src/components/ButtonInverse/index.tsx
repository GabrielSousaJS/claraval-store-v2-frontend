import "./styles.css";

type Props = {
  text: string;
};

export default function ButtonInverse({ text }: Props) {
  return (
    <button className="btn btn-danger p-3 button-invserse">
      <h6 className="text-uppercase">{text}</h6>
    </button>
  );
}
