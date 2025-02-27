// src/components/SearchForm.js

export default function SearchForm({ placeholder, handleSearch }) {
    return (
      <div>
        <input 
          type="text" 
          placeholder={placeholder} 
          onChange={handleSearch} 
        />
      </div>
    );
  }
  