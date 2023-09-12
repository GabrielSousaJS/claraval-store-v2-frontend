import ContentLoader from "react-content-loader";

export default function CategoryLoader() {
  return (
    <div className="d-flex">
      <ContentLoader
        speed={2}
        width={1440}
        height={70}
        viewBox="0 0 1440 70"
        backgroundColor="#ecebeb"
        foregroundColor="#d6d2d2"
      >
        <rect x="0" y="0" rx="2" ry="2" width="1440" height="70" />
      </ContentLoader>
    </div>
  );
}
