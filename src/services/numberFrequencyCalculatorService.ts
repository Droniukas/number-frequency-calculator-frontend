import axios from "axios";
import NumberFrequencyCalculatorInputDto from "../interfaces/numberFrequencyCalculatorInputDto.interface";

export class NumberFrequencyCalculatorService {
  public async calculateNumberFrequency(inputData: number[]) {
    const inputDataMapped: NumberFrequencyCalculatorInputDto = {
      data: inputData,
    };
    const response = await axios.post(
      "http://localhost:8080/api/numberFrequencyCalculator",
      inputDataMapped
    );
    return response;
  }
}
