export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    minHeight: "50px",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
    cursor: "pointer",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "#818181",
  }),
  option: (provided: any) => ({
    ...provided,
    color: "var(--color-text)",
    cursor: "pointer",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};
