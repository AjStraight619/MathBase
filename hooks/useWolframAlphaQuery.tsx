"use client";
import { useMutation } from "react-query";
import { useItemId } from "./useItemId";

type WolframQueryParams = {
  plainTextQuestion: string;
  latexEq: string;
};

const useWolframQuery = () => {
  const chatId = useItemId();

  const {
    mutate: mutateLaTeXToPlainText,
    isLoading: isLoadingLaTeXToPlainText,
    isError: isErrorLaTeXToPlainText,
    error: errorLaTeXToPlainText,
  } = useMutation(async (formData: FormData) => {
    const latexEquation = formData.get("equation");

    if (!latexEquation) {
      return;
    }
    const response = await fetch("/api/math/convert-latex", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const content = data.response?.message?.content;

    return content;
  });

  const {
    mutate: mutatePlainTextToWolframResult,
    isLoading: isLoadingPlainTextToWolfram,
    isError: isErrorPlainTextToWolfram,
    error: errorPlainTextToWolfram,
  } = useMutation(async (params: WolframQueryParams) => {
    const { plainTextQuestion, latexEq } = params;
    console.log("This is the latex eq in the wolfram alpha query: ", latexEq);
    const res = await fetch(
      `/api/wolfram-alpha?queryString=${plainTextQuestion}&chatId=${chatId}&latexEquation=${latexEq}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });

  return {
    mutateLaTeXToPlainText,
    isLoadingLaTeXToPlainText,
    isErrorLaTeXToPlainText,
    errorLaTeXToPlainText,
    mutatePlainTextToWolframResult,
    isLoadingPlainTextToWolfram,
    isErrorPlainTextToWolfram,
    errorPlainTextToWolfram,
  };
};

export default useWolframQuery;
