import React, {useState, useEffect} from "react";

function Rating(ratingProps) {
  // Props
  const {wholeNumber, setWholeNumber, decimalNumber, setDecimalNumber} = ratingProps;

  const [decimals, setDecimals] = useState();
  const [whole, setWhole] = useState(["0", "1", "2", "3", "4", "5"]);

  const decimalNumbers = [
    {
      wholeNum: [0, 1, 2, 3, 4],
      decimalNums: ["0", "25", "5", "75"]
    },
    {
      wholeNum: [5],
      decimalNums: ["0"]
    }
  ];

  useEffect(() => {
    const getDecimalNums = () => {
      decimalNumbers.map((item) => {
        item.wholeNum.map((num) => {
          if(wholeNumber == num) {
            setDecimals(item.decimalNums)
          }
        });
      });
    }

    getDecimalNums();
  }, [wholeNumber]);

  return (
    <div className="Rating">
      <p>What do you rate this book?</p>
      <div className="d-flex justify-content-center justify-content-lg-start">
        <select className="WholeNumber form-select text-center w-auto" value={wholeNumber} onChange={(e) => setWholeNumber(e.target.value)}>
          <option hidden selected>{wholeNumber}</option>
          {whole && whole.map((item) => {
            return (
              <option value={item}>{item}</option>
            );
          })}
        </select>

        <h1 className="m-0 mx-1">.</h1>

        <select className="DecimalNumber form-select text-center w-auto" value={decimalNumber} onChange={(e) => setDecimalNumber(e.target.value)}>
          <option hidden selected>{decimalNumber}</option>
          {decimals && decimals.map((item) => {
            return (
              <option value={item}>{item}</option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Rating;
