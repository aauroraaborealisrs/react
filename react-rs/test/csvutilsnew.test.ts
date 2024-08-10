import { Character, convertToCSV, createCSVBlob } from "../src/utils/csvutilsnew";

describe('convertToCSV', () => {
  it('converts character objects to a CSV string', () => {
    const characters: Character[] = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        hair_color: 'none',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        gender: 'male',
        url: 'https://swapi.dev/api/people/4/',
      },
    ];

    const expectedCSV = `name,height,mass,hair_color,skin_color,eye_color,birth_year,gender
Luke Skywalker,172,77,blond,fair,blue,19BBY,male
Darth Vader,202,136,none,white,yellow,41.9BBY,male`;

    const csvString = convertToCSV(characters);
    expect(csvString).toBe(expectedCSV);
  });

  it('handles empty characters array correctly', () => {
    const characters: Character[] = [];

    const expectedCSV = `name,height,mass,hair_color,skin_color,eye_color,birth_year,gender`;

    const csvString = convertToCSV(characters);
    expect(csvString).toBe(expectedCSV);
  });
});

describe('createCSVBlob', () => {
    it('creates a CSV Blob from character objects', async () => {
      const characters: Character[] = [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: 'https://swapi.dev/api/people/1/',
        },
      ];
  
      const blob = createCSVBlob(characters);
  
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/csv;charset=utf-8;');
  
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = () => {
        const result = reader.result as string;
        const expectedCSV = `name,height,mass,hair_color,skin_color,eye_color,birth_year,gender
  Luke Skywalker,172,77,blond,fair,blue,19BBY,male`;
  
        expect(result).toBe(expectedCSV);
      };
  
      await new Promise((resolve) => (reader.onloadend = resolve));
    });
  
    it('handles empty characters array correctly', async () => {
      const characters: Character[] = [];
  
      const blob = createCSVBlob(characters);
  
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('text/csv;charset=utf-8;');
  
      const reader = new FileReader();
      reader.readAsText(blob);
      reader.onload = () => {
        const result = reader.result as string;
        const expectedCSV = `name,height,mass,hair_color,skin_color,eye_color,birth_year,gender`;
  
        expect(result).toBe(expectedCSV);
      };
  
      await new Promise((resolve) => (reader.onloadend = resolve));
    });
  });
  