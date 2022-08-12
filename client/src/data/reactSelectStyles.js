// react-select styling, adapted from:
// https://stackoverflow.com/questions/54218351/changing-height-of-react-select-component/60912805#60912805

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: 'rgb(252,252,252)',
    borderColor: '#bbbbbb',
    minHeight: '48px',
    height: '48px',
    width: '400px',
    fontSize: 'large',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: '48px',
    padding: '0 6px',
    width: '400px',
    fontSize: 'large',
  }),

  menu: (provided) => ({
    ...provided,
    width: '400px',
    fontSize: 'large',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
    textAlign: 'center',
    fontSize: 'large',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    height: '48px',
  }),
};

export default customStyles;
