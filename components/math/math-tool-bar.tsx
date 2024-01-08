"use client";
import useWolframQuery from "@/hooks/useWolframAlphaQuery";
import { buttonCategories } from "@/lib/data";
import { ButtonCategories, MathResponseType } from "@/lib/types";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MathField } from "react-mathquill";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import MathSubmitBtn from "../ui/math-response-button";

const EditableMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.EditableMathField),
  { ssr: false }
);

const MathToolbar = () => {
  const [error, setError] = useState("");
  const [latex, setLatex] = useState("");
  const [data, setData] = useState();
  const [mathResponse, setMathResponse] = useState<MathResponseType | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<keyof ButtonCategories>("basic");

  const {
    mutateLaTeXToPlainText,
    mutatePlainTextToWolframResult,
    isLoadingLaTeXToPlainText,
    isLoadingPlainTextToWolfram,
  } = useWolframQuery();

  // window is not defined here when loading on the server, using typeof window !== "undefined" does not work for this.
  useEffect(() => {
    import("react-mathquill").then((mq) => {
      mq.addStyles();
    });
  }, []);

  const handleMathSymbolClick = (symbolLatex: string) => {
    setLatex((prev) => prev + symbolLatex);
  };

  const handleInputChange = (mathField: MathField) => {
    const newLatex = mathField.latex();
    setLatex(newLatex);
  };

  const handleMathSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("equation", latex);

    mutateLaTeXToPlainText(formData, {
      onSuccess: (data) => {
        mutatePlainTextToWolframResult(data, {
          onSuccess: (data) => {
            console.log(data);
            setMathResponse(data);
          },
          onError: (error) => {
            if (error instanceof Error) {
              setError("Error in Wolfram result: " + error.message);
            }
          },
        });
      },
      onError: (error) => {
        if (error instanceof Error) {
          setError("Error in LaTeX conversion: " + error.message);
        }
      },
    });
  };

  const renderPodsData = () => {
    return mathResponse?.podsData.map((pod, index) => (
      <div key={index}>
        <h3>{pod.title}</h3>
        {pod.content.map((contentItem, subIndex) => (
          <div key={subIndex}>
            <p>{contentItem.plaintext}</p>
            {contentItem.imageUrl && (
              <img
                src={contentItem.imageUrl}
                alt={`Result ${index}-${subIndex}`}
              />
            )}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <>
      <form onSubmit={handleMathSubmit}>
        <Card className="relative">
          <CardContent className="p-4">
            <Suspense fallback={<div>Loading...</div>}>
              <EditableMathField
                latex={latex}
                onChange={handleInputChange}
                className="w-full border border-border rounded p-2 mb-4 text-lg  bg-primary text-primary-foreground"
              />
            </Suspense>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(buttonCategories).map((category) => (
                <Button
                  type="button"
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category as keyof ButtonCategories)
                  }
                  className={`px-4 py-2 rounded text-sm font-semibold ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/30 text-primary-foreground/70"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {buttonCategories[selectedCategory].map((button) => (
                <Button
                  type="button"
                  key={button.symbol}
                  onClick={() => handleMathSymbolClick(button.latex)}
                  className="p-2 border border-gray-300 rounded text-lg"
                >
                  {button.symbol}
                </Button>
              ))}
            </div>
            <MathSubmitBtn
              isLoadingLaTeXToPlainText={isLoadingLaTeXToPlainText}
              isLoadingPlainTextToWolfram={isLoadingPlainTextToWolfram}
              className="mt-4 text-primary-foreground px-4 py-2 rounded font-semibold group transition-all hover:scale-105 bg-primary/80 hover:bg-primary"
            >
              Calculate
              <FaPaperPlane className="ml-2 inline-block group-hover:translate-x-1 group-hover:-translate-y-1 duration-100" />
            </MathSubmitBtn>
            {error && <p className="text-red-500/30">{error}</p>}
          </CardContent>
        </Card>
      </form>

      <div className="flex flex-col items-center justify-center container gap-3 mt-4">
        <div className="max-h-96 overflow-auto w-full">
          {data && (
            <pre
              className="text-start"
              style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
            >
              {JSON.stringify(mathResponse, null, 2)}
            </pre>
          )}
        </div>
        {mathResponse && renderPodsData()}
      </div>
    </>
  );
};

export default MathToolbar;
