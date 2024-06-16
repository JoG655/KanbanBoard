import { type TextAreaProps, TextArea } from "../../components/TextArea";
import { BookType } from "lucide-react";

const textAreaStyleVariants: TextAreaProps["styleVariant"][] = [
  "primary",
  "secondary",
];

const textAreaStyleSizes: TextAreaProps["styleSize"][] = [
  "sm",
  "md",
  "lg",
  "xl",
];

export function DemoTextArea() {
  return (
    <>
      <h1 className="text-2xl font-bold uppercase tracking-wide">Text Area</h1>
      {textAreaStyleVariants.map((textAreaStyleVariant) => (
        <div
          className="flex flex-col items-center gap-6"
          key={textAreaStyleVariant}
        >
          <div className="grid gap-2">
            <h2 className="text-lg uppercase tracking-wide">
              {textAreaStyleVariant} Default
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {textAreaStyleSizes.map((textAreaStyleSize, index) => (
                <TextArea
                  key={textAreaStyleSize}
                  styleVariant={textAreaStyleVariant}
                  styleSize={textAreaStyleSize}
                  defaultValue={
                    index === textAreaStyleSizes.length - 2
                      ? "Read only text"
                      : index === textAreaStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === textAreaStyleSizes.length - 2}
                  disabled={index === textAreaStyleSizes.length - 1}
                >
                  {index > 0 ? <BookType /> : "Text"}
                </TextArea>
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg uppercase tracking-wide">
              {textAreaStyleVariant} Stack
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {textAreaStyleSizes.map((textAreaStyleSize, index) => (
                <TextArea
                  key={textAreaStyleSize}
                  styleVariant={textAreaStyleVariant}
                  styleSize={textAreaStyleSize}
                  styleStack={true}
                  defaultValue={
                    index === textAreaStyleSizes.length - 2
                      ? "Read only text"
                      : index === textAreaStyleSizes.length - 1
                        ? "Disabled text"
                        : ""
                  }
                  readOnly={index === textAreaStyleSizes.length - 2}
                  disabled={index === textAreaStyleSizes.length - 1}
                >
                  {index > 0 ? <BookType /> : "Text"}
                </TextArea>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
