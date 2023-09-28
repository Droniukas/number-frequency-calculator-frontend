import React, { useRef, useState } from "react";
import "./Main.css";
import { Button, TextField, TextFieldProps } from "@mui/material";
import { NumberFrequencyCalculatorService } from "../../services/numberFrequencyCalculatorService";
import debounce from "lodash.debounce";

const Main = () => {
  const inputRef = useRef<TextFieldProps>(null!);
  const [validInput, setValidInput] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showResultError, setShowResultError] = useState<boolean>(false);
  const numberFrequencyCalculatorService =
    new NumberFrequencyCalculatorService();

  const calculateNumberFrequency = async (inputData: number[]) => {
    try {
      await numberFrequencyCalculatorService.calculateNumberFrequency(
        inputData
      );
      setShowResult(true);
    } catch {
      setShowResultError(true);
    }
  };

  const resetResult = () => {
    setShowResult(false);
    setShowResultError(false);
  };

  const handleCalculateButtonClick = async () => {
    resetResult();
    const inputValue = inputRef.current.value as string;
    if (inputValue.trim() === "") {
      setValidInput(false);
      return;
    }

    const inputNumberValues = inputValue
      .split(",")
      .map((value) => Number(value));

    await calculateNumberFrequency(inputNumberValues);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetResult();
    validateInputDebounced(event);
  };

  const validateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^(-?\d+)?(,-?\d+)*$/;
    const inputValueCleaned = event.target.value.replace(/\s/g, "");
    setValidInput(reg.test(inputValueCleaned));
  };
  const validateInputDebounced = debounce(validateInput, 350);

  return (
    <div id='main-container'>
      <div>
        Input numbers separated by commas and press "Calculate"
        <div id='main-input-and-button-container'>
          <TextField
            hiddenLabel
            id='filled-hidden-label-small'
            variant='filled'
            size='small'
            placeholder='1, 2, 3'
            inputRef={inputRef}
            onChange={handleInputChange}
            error={!validInput}
          />
          <Button
            disabled={!validInput}
            onClick={handleCalculateButtonClick}
            variant='outlined'
          >
            Calculate
          </Button>
        </div>
        <div className={`error-div ${!validInput && "visible"}`}>
          Invalid input
        </div>
        <div className={`result-div ${showResult && "visible"}`}>
          Successful, now check the API console!
        </div>
        <div className={`result-error-div ${showResultError && "visible"}`}>
          Something, went wrong...{" "}
          {"(make sure the backend is running correctly)"}
        </div>
      </div>
    </div>
  );
};

export default Main;
