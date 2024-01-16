import Head from "next/head";

export default async function TestPage() {
  const latexEquation = "\\frac{x}{b}";
  let convertedLatex = "";

  try {
    const res = await fetch("http://localhost:3000/api/math/render-latex", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latexEquation }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.error) {
      throw new Error(`Server error! message: ${data.error}`);
    }

    if (typeof data.renderedLatex !== "string") {
      throw new Error("Invalid response format! Expected a string.");
    }

    convertedLatex = data.renderedLatex;
  } catch (error) {
    console.error("Error fetching or parsing response:", error);
    convertedLatex = "Error rendering equation.";
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-2">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        />
      </Head>

      {convertedLatex.startsWith("Error") ? (
        <div>{convertedLatex}</div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: convertedLatex }}></div>
      )}
    </div>
  );
}
