"use client";
import { useMathModeContext } from "@/context/MathModeProvider";
import { useItemId } from "@/hooks/useItemId";
import useLocalStorage from "@/hooks/useLocalStorage";
import useWolframQuery from "@/hooks/useWolframAlphaQuery";
import { buttonCategories } from "@/lib/data";
import { ButtonCategories, MathResponseType } from "@/lib/types";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SetStateAction, Suspense, useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MathField } from "react-mathquill";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import MathSubmitBtn from "../ui/math-response-button";

type MathToolbarProps = {
  showMathToolbar: boolean;
  toggleMathToolbar: () => void;
  setMathResponse: React.Dispatch<SetStateAction<MathResponseType | null>>;
};

const EditableMathField = dynamic(
  () => import("react-mathquill").then((mod) => mod.EditableMathField),
  { ssr: false }
);

const MathToolbar = ({
  showMathToolbar,
  setMathResponse,
}: MathToolbarProps) => {
  const chatId = useItemId();
  const { mathMode } = useMathModeContext();
  const [error, setError] = useState("");
  const [latex, setLatex] = useState("");
  const [storedLatex, setStoredLatex] = useLocalStorage<string>(
    "mathInput",
    latex
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

  // useEffect(() => {
  //   if (storedLatex !== null && storedLatex !== latex) {
  //     setLatex(storedLatex);
  //   }
  // }, [storedLatex, latex]);

  const handleMathSymbolClick = (symbolLatex: string) => {
    setLatex((prev) => prev + symbolLatex);
  };

  const handleInputChange = (mathField: MathField) => {
    const newLatex = mathField.latex();
    setLatex(newLatex);
    setStoredLatex(newLatex);
  };

  const handleMathSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const mathFormData = new FormData();
    mathFormData.append("chatId", chatId);
    formData.append("equation", latex);

    mutateLaTeXToPlainText(formData, {
      onSuccess: (data) => {
        mutatePlainTextToWolframResult(
          {
            plainTextQuestion: data,
            latexEq: latex,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              setMathResponse(data);
              mathFormData.append("mathResponse", JSON.stringify(data));
              // await addMathResponseToChat(mathFormData);
            },
            onError: (error) => {
              if (error instanceof Error) {
                setError("Error in Wolfram result: " + error.message);
              }
            },
          }
        );
      },
      onError: (error) => {
        if (error instanceof Error) {
          setError("Error in LaTeX conversion: " + error.message);
        }
      },
    });
  };

  // const renderPodsData = () => {
  //   return mathResponse?.podsData.map((pod, index) => {
  //     const { width, height} = pod;
  //     return (

  //     )
  //     <div key={index}>
  //       <h3>{pod.title}</h3>
  //       {pod.content.map((contentItem, subIndex) => (
  //         <div key={subIndex}>
  //           <p>{contentItem.plaintext}</p>
  //           {contentItem.imageUrl && (
  //             <Image
  //               src={contentItem.imageUrl}
  //               alt={`Result ${index}-${subIndex}`}
  //               width={}
  //             />
  //           )}
  //         </div>
  //       ))}
  //     </div>
  // });
  // };

  return (
    <>
      {showMathToolbar && mathMode && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 0.3,
            stiffness: 100,
            bounce: 0.1,
          }}
          exit={{ opacity: 0, decelerate: 0.5 }}
          className="mb-2 mx-auto max-w-xl"
        >
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
        </motion.div>
      )}
    </>
  );
};

export default MathToolbar;
