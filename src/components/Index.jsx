import { useState } from "react";
import { toast } from "sonner";
import Tesseract from "tesseract.js";
import "../App.css";
import "../css/scannerCss.css";
import "../css/backgroundCss.css";
import useAppContext from "../context";
import useParseIdText from "../hooks/useParseIdText";
import UploadImage from "./uploadImage";
import DataTable from "./DataTable";
import Button from "./Button";

function Index() {
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState("");
  const {
    file,
    setFile,
    imageSrc,
    setImageSrc,
    language,
    submit,
    setSubmit,
    parseIDData,
    setParseIdData,
  } = useAppContext();

  //process the image for tesseract
  const processImage = () => {
    const toastId = toast.loading("Scanning your ID...");
    setSubmit(true);
    setResult("");
    setProgress(0);
    Tesseract.recognize(file, language, {
      logger: (m) => {
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      setParseIdData(useParseIdText({ text: text }));
      toast.dismiss(toastId);
      toast.success("ID scanned");
      setSubmit(false);
      setResult(text);
    });
  };

  return (
    <div className="App text-white flex flex-col items-center justify-center context">
      <h2 className=" text-3xl font-semibold min-w-full text-left mb-4">
        Citizen ID OCR
      </h2>

      {imageSrc && submit && !result ? (
        <div class={`fingerprint scanning ${imageSrc ? "" : "hidden"} w-full`}>
          <canvas id="canvas"></canvas>
          <img src={imageSrc} alt="img" />
        </div>
      ) : imageSrc && !submit && !result ? (
        <img src={imageSrc} alt="img" className="DisplayImage" />
      ) : (
        !imageSrc && !submit && !result && <UploadImage />
      )}

      {result && <DataTable data={parseIDData} />}

      {!submit ? (
        <>
          {/* the submit buttons if the image is not submitted */}
          <div style={{ marginTop: 25 }}>
            {!parseIDData && (
              <Button
                type="button"
                value="Submit"
                onClick={() => {
                  if (file) processImage();
                  if (!file) toast.error("Upload a file first");
                }}
                label={"submit"}
              />
            )}
            <Button
              type="button"
              value="Submit"
              onClick={() => {
                setFile(null);
                setImageSrc("");
                setResult("");
                setParseIdData(null);
              }}
              label={parseIDData ? "Retry" : "Cancel"}
            />
          </div>
        </>
      ) : (
        <>
          {/* the progress bar if the image is submitted */}
          <div className="min-w-full mt-4">
            <div class="flex justify-end mb-1">
              <span class="text-sm font-medium text-blue-700 dark:text-white">
                {Math.floor(progress * 100)}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 transition-all duration-300">
              <div
                class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}

      <div class="flex items-center justify-start min-w-full mt-4">
        <p className="text-red-500 max-md:text-xs">
          Note: Data would not be so accurate for many factors (unclear text,
          typos ...)
        </p>
      </div>
    </div>
  );
}

export default Index;
