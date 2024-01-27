import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [language, setLanguage] = useState("eng");
  const [submit, setSubmit] = useState(false);
  const [parseIDData,setParseIdData] = useState(null)
  return (
    <AppContext.Provider
      value={{
        file,
        setFile,
        imageSrc,
        setImageSrc,
        language,
        setLanguage,
        submit,
        setSubmit,
        parseIDData,
        setParseIdData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppContext() {
  return useContext(AppContext);
}