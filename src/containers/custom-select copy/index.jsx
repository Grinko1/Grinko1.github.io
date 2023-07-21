import React, { useState } from "react";
import "./style.css";
const options = [
  { value: "*", label: "Все" },
  { value: "ru", label: "Россия" },
  { value: "fr", label: "Франция" },
  { value: "au", label: "Австралия" },
  { value: "ul", label: "Южная Африка" },
  { value: "us", label: "США" },
  { value: "**", label: "Все" },
  { value: "ru", label: "Россия" },
  { value: "fr", label: "Франция" },
  { value: "au", label: "Австралия" },
  { value: "ul", label: "Южная Африка" },
  { value: "us", label: "США" },
];

const CustomSelect2 = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(true);

  console.log(showOptions);
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm("");
    setShowOptions(false);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
       <div className="wrapper">
      <div className="select-btn">
        <span>Select Country</span>
        <i className="uil uil-angle-down"></i>
      </div>
      <div className="content">
        <div className="search">
          <i className="uil uil-search"></i>
          <input spellcheck="false" type="text" placeholder="Search"/>
        </div>
        <ul className="options">
          {
            
          }
        </ul>
      </div>
    </div>

  );
};

export default CustomSelect2;
