const { convertLatexToWolframQuery } = require('../lib/test')

describe("convertLatexToWolframQuery", () => {
  it("should convert integral LaTeX to Wolfram Alpha query", () => {
    const latex = "\\int x^2 dx";
    const expected = "integrate x^2 dx";
    expect(convertLatexToWolframQuery(latex)).toBe(expected);
  });

  // it("should convert sum LaTeX to Wolfram Alpha query", () => {
  //   const latex = "\\sum_{i=1}^n i";
  //   const expected = "sum i from i=1 to n";
  //   expect(convertLatexToWolframQuery(latex)).toBe(expected);
  // });
});
