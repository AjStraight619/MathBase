"use client";

import { MathResponseType } from "@/lib/types";

type MathResponseProps = {
  mathResponse: MathResponseType;
};

const MathResponse = ({ mathResponse }: MathResponseProps) => {
  // Render logic for MathResponseType
  // Utilize mathResponse properties like inputString, podsData, etc.
  return (
    <div>
      <p>Math Response: {mathResponse.inputString}</p>
      {/* Render more details from mathResponse */}
    </div>
  );
};

export default MathResponse;
