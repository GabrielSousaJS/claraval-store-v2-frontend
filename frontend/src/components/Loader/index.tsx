import ContentLoader from "react-content-loader";

export default function Loader() {
  return (
    <div className="d-flex">
      <ContentLoader
        speed={2}
        width={1440}
        height={250}
        viewBox="0 0 1440 250"
        backgroundColor="#ecebeb"
        foregroundColor="#d6d2d2"
      >
        <rect x="0" y="0" rx="2" ry="2" width="1440" height="250" />
      </ContentLoader>
    </div>
  );
}
