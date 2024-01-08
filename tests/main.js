const convertLatexToWolframAlphaQuery = (latex) => {
    let query = latex;
  
    query = query
      .replace(/\\int/g, "integrate")
      .replace(/\\sum_{(.+?)}\^{(.+?)}/g, (match, lower, upper) => {
        lower = lower.replace(/[{}]/g, ''); // Removing braces
        upper = upper.replace(/[{}]/g, ''); // Removing braces
        return `sum ${lower} from ${upper}`;
      })
      .replace(/\\frac{(.+?)}{(.+?)}/g, "($1)/($2)");
  
    return query;
};

module.exports = { convertLatexToWolframAlphaQuery };