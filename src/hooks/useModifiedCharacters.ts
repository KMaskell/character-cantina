import { useState } from "react";

const LOCAL_STORAGE_KEY = "modifiedCharacters";

type ModifiedCharacter = {
  id: string;
  height?: string;
  gender?: string;
};

export const useModifiedCharacters = () => {
  const [modifiedCharacters, setModifiedCharacters] = useState<Record<string, ModifiedCharacter>>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  const updateCharacter = (id: string, updates: Partial<ModifiedCharacter>) => {
    setModifiedCharacters((prev) => {
      const updated = { ...prev, [id]: { ...prev[id], ...updates } };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { modifiedCharacters, updateCharacter };
};



// Merging Local Edits with API Data
// In the Character Details component, merge the SWAPI data with user modifications:

// import { useModifiedCharacters } from "../hooks/useModifiedCharacters";

// const CharacterDetails = ({ character }) => {
//   const { modifiedCharacters } = useModifiedCharacters();
//   const modified = modifiedCharacters[character.id];

//   return (
//     <div>
//       <h1>{character.name}</h1>
//       <p>Height: {modified?.height ?? character.height}</p>
//       <p>Gender: {modified?.gender ?? character.gender}</p>
//     </div>
//   );
// };


// Allowing Users to Edit Characters:
// const CharacterEditForm = ({ character }) => {
//   const { updateCharacter } = useModifiedCharacters();
//   const [height, setHeight] = useState(character.height);
//   const [gender, setGender] = useState(character.gender);

//   const handleSave = () => {
//     updateCharacter(character.id, { height, gender });
//   };

//   return (
//     <div>
//       <input value={height} onChange={(e) => setHeight(e.target.value)} />
//       <select value={gender} onChange={(e) => setGender(e.target.value)}>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="n/a">N/A</option>
//       </select>
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// };


// Why This Approach Works
// ✅ Non-Destructive – Since SWAPI is read-only, this approach ensures changes only affect the user’s local experience.
// ✅ Persisted Edits – Edits remain even after page refreshes.
// ✅ Simple & Scalable – This method avoids complex state management tools while keeping edits accessible.
// ✅ Future Expandability – Could later be extended to store edits in a backend if needed.


