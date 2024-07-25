import reducer, {
    setSearchTerm,
    setPeople,
    setTotalPages,
    selectItem,
    unselectItem,
    unselectAllItems,
  } from '../src/store/peopleSlice'; 
import { Character } from '../src/interfaces';

  
  describe('peopleSlice', () => {
    const initialState = {
      searchTerm: '',
      people: [],
      totalPages: 1,
      currentPage: 1,
      storedSearchTerm: '',
      selectedItems: [],
    };
  
    test('should handle setSearchTerm', () => {
      const action = setSearchTerm('Luke');
      const state = reducer(initialState, action);
      expect(state.searchTerm).toBe('Luke');
    });
  
    test('should handle selectItem and unselectItem', () => {
      const character: Character = { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male' };
      
      let state = reducer(initialState, selectItem(character));
      expect(state.selectedItems).toContain(character);
  
      state = reducer(state, unselectItem(character.name));
      expect(state.selectedItems).not.toContain(character);
    });
  
    test('should handle unselectAllItems', () => {
      const character1: Character = { name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male' };
      const character2: Character = { name: 'Darth Vader', height: '202', mass: '136', hair_color: 'none', skin_color: 'white', eye_color: 'yellow', birth_year: '41.9BBY', gender: 'male' };
      
      let state = reducer(initialState, selectItem(character1));
      state = reducer(state, selectItem(character2));
      expect(state.selectedItems).toHaveLength(2);
      
      state = reducer(state, unselectAllItems());
      expect(state.selectedItems).toHaveLength(0);
    });
  
    test('should handle setPeople and setTotalPages', () => {
      const people: Character[] = [{ name: 'Luke Skywalker', height: '172', mass: '77', hair_color: 'blond', skin_color: 'fair', eye_color: 'blue', birth_year: '19BBY', gender: 'male' }];
      
      let state = reducer(initialState, setPeople(people));
      expect(state.people).toEqual(people);
  
      state = reducer(state, setTotalPages(5));
      expect(state.totalPages).toBe(5);
    });
  });
  