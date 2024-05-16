import i18next from 'i18next';
import React from 'react';

const LanguageSelector = () => {
  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    i18next.changeLanguage(selectedLanguage);
  }

  return (
    <select
      className="language-select"
      onChange={changeLanguage}
    >
      <option value="en">English</option>
      <option value="ua">Ukrainian</option>
      <option value="he">Hebrew</option>
    </select>
  );
}

export default LanguageSelector;
