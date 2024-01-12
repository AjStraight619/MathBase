const convertLatexToWolframQuery = (latex) => {
    let query = latex;
  
    query = query
      .replace(/\\int/g, "integrate")
      .replace(/\\sum_{(.+?)}\^{(.+?)}/g, (match, lower, upper) => {
        lower = lower.replace(/[{}]/g, ''); 
        upper = upper.replace(/[{}]/g, '');
        return `sum ${lower} from ${upper}`;
      })
      .replace(/\\frac{(.+?)}{(.+?)}/g, "($1)/($2)");
  
    return query;
  };
  
  module.exports = { convertLatexToWolframQuery };
  