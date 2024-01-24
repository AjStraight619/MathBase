"use client";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import MathSubject from "./math-button-selection";

export default function Calculator() {
  const [subject, selectedSubject] = useState("");
  return (
    <Card>
      <CardContent className="relative flex flex-col space-y-2">
        <MathSubject className="absolute top-1 right-1" />
      </CardContent>
    </Card>
  );
}
