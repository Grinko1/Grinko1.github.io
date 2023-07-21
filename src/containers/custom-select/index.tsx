import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Country } from "@src/store/countries/types";
import { useObserver } from "@src/hooks/use-observer";
import { useStore } from "react-redux";

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

interface ICustomSelect {
  countries: Country[];
  waiting: boolean;
}
const CustomSelect = (props: ICustomSelect) => {
  const [selectedOption, setSelectedOption] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [skip, setSkip] = useState(0);

  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<any>()
  const store = useStore();

  useEffect(() => {
    const callback = function (entries: any, observer: any) {
      console.log(entries)
      console.log('div visible')
    };
     observer.current = new IntersectionObserver(callback);

  if (lastElement.current) {
    console.log('inside')
      observer.current.observe(lastElement?.current);
    }
  }, []);


  // useEffect(() => {
  //   //@ts-ignore
  //   store.actions?.countries?.load();
  // }, [skip]);


  //load
  // store.actions.countries.load(),

  //  useObserver(lastElement, true, props.waiting, () => {
  //     // setPage(page + 1);
  // })

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setSearchTerm("");
    setShowOptions(false);
  };

  const filteredOptions = props.countries.filter((option) =>
    option?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="custom">
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="selectChoozen"
      >
        <div className="selectChoozen_value">
          <span className="optionName">
            {selectedOption?.code ? selectedOption?.code : "*"}
          </span>
          <p>{selectedOption?.title ? selectedOption?.title : "Все"}</p>
        </div>
        <div className="optionArrow">
          <i
            className={showOptions ? "arrow arrowOpen" : "arrow arrowClose"}
          ></i>
        </div>
      </div>
      <div className="selectContainer">
        {showOptions && (
          <div className="scrollWrapper">
            <ul className="ulSelect">
              <li key="1">
                <input
                  className="selectInput"
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Поиск"
                />
              </li>
              {filteredOptions.map((option) => (
                <li
                  key={option._id}
                  onClick={() => handleOptionClick(option)}
                  className={
                    option?.title === selectedOption?.title ? "liChosen" : ""
                  }
                >
                  <span className="optionName">{option.code}</span>
                  {option.title}
                </li>
              ))}
              <div className="pointLoad" ref={lastElement}></div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
