import React from "react";

function OCRLanguage({setLanguage,language}) {
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value="eng">English</option>
      <option value="tel">Telugu</option>
      <option value="hin">Hindi</option>
      <option value="kan">Kannada</option>
    </select>
  );
}

export default OCRLanguage;
