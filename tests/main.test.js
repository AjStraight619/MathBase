const {convertLatexToWolframAlphaQuery} = require('./main')

describe("convertLatexToWolframAlphaQuery", () => {
    it("should convert integral LaTeX to Wolfram Alpha query", () => {
      const latex = "\\int x^2 dx";
      const expected = "integrate x^2 dx";
      expect(convertLatexToWolframAlphaQuery(latex)).toBe(expected);
    });
  
    it("should convert sum LaTeX to Wolfram Alpha query", () => {
      const latex = "\\sum_{i=1}^n i";
      const expected = "sum i from i=1 to n";
      expect(convertLatexToWolframAlphaQuery(latex)).toBe(expected);
    });
  
    // Add more test cases as needed
  });