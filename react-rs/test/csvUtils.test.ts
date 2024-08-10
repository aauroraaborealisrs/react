import { Character, convertToCSV, createCSVBlob } from "../app/utils/csvutils";

const sampleCharacters: Character[] = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    url: "https://example.com/luke-skywalker",
  },
  {
    name: "Leia Organa",
    height: "150",
    mass: "49",
    hair_color: "brown",
    skin_color: "light",
    eye_color: "brown",
    birth_year: "19BBY",
    gender: "female",
    url: "https://example.com/leia-organa",
  },
];

describe("CSV Utilities", () => {
  describe("convertToCSV", () => {
    it("should convert array of characters to CSV format", () => {
      const csv = convertToCSV(sampleCharacters);
      expect(csv).toEqual(
        `name,height,mass,hair_color,skin_color,eye_color,birth_year,gender\nLuke Skywalker,172,77,blond,fair,blue,19BBY,male\nLeia Organa,150,49,brown,light,brown,19BBY,female`,
      );
    });
  });

  describe("createCSVBlob", () => {
    it("should create a Blob object from the CSV string", () => {
      const blob = createCSVBlob(sampleCharacters);
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toEqual("text/csv;charset=utf-8;");
    });
  });
});
