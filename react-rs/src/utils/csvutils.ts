// utils/csvutils.ts
export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    url: string;
  }
  
  export const convertToCSV = (characters: Character[]): string => {
    const header = [
      "name",
      "height",
      "mass",
      "hair_color",
      "skin_color",
      "eye_color",
      "birth_year",
      "gender",
    ];
    const rows = characters.map((item) => [
      item.name,
      item.height,
      item.mass,
      item.hair_color,
      item.skin_color,
      item.eye_color,
      item.birth_year,
      item.gender,
    ]);
  
    return [header, ...rows].map((e) => e.join(",")).join("\n");
  };
  
  export const createCSVBlob = (characters: Character[]): Blob => {
    const csvString = convertToCSV(characters);
    return new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  };
  