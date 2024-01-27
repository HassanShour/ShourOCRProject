//create a hook that takes in a string and returns an array of objects with the following structure:

export default function useParseIdText({ text }) {
  const parseIDData = (text) => {
    const data = {
      name: "",
      nationality: "",
      dateOfBirth: "",
      sex: "",
    };

    // Common patterns
    const namePattern =
      /(?:voornamen\/ given names|oornamen given names)\s*([^\r\n]+)/;
    const nationalityPattern = /nationaliteit\/ nationality\s*([^\r\n]+)/;
    const dobPattern =
      /geboortedatum\/date of birth\s*([^\r\n]+)|(\d{2} [A-Z]+\/[A-Z]+ \d{4})/;
    const sexPattern = /geslacht\/sex\s*([^\r\n]+)/;

    const nameMatch = text.match(namePattern);
    const nationalityMatch = text.match(nationalityPattern);
    const dobMatch = text.match(dobPattern);
    const sexMatch = text.match(sexPattern);

    if (nameMatch) data.name = nameMatch[1].trim();
    if (nationalityMatch) data.nationality = nationalityMatch[1].trim();
    if (dobMatch)
      data.dateOfBirth = dobMatch[1] ? dobMatch[1].trim() : dobMatch[2].trim();
    if (sexMatch) data.sex = sexMatch[1]?.trim();

    return data;
  };
  return parseIDData(text);
}
