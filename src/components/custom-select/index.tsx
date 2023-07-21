import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { useObserver } from "@src/hooks/use-observer";
import LoadingAnimation from "../small-loader";
import { cn as bem } from "@bem-react/classname";

interface ICustomSelect {
  onChange: (option: Option) => void;
  skip: number;
  setSkip: (skip: number) => void;
  options: Option[];
  waiting: boolean;
  searchOption: (title: string) => void;
  canLoad: boolean;
  setSearchTerm: (str: string) => void;
  searchTerm: string;
  selectedValue: Option[];
  setArrSelectedCountries: (id: string) => void;
}
export interface Option {
  _id: string;
  value: string | number;
  title: string;
  code: string;
  selected?:boolean
}

const CustomSelect = (props: ICustomSelect) => {
  const {
    skip,
    setSkip,
    searchOption,
    canLoad,
    searchTerm,
    setSearchTerm,
    selectedValue,
  } = props;

  const [selectedOption, setSelectedOption] = useState<any>(selectedValue);
  const [showOptions, setShowOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState<Option | null>(null);

  const lastElement = useRef<HTMLDivElement>(document.createElement("div"));
  const liRefs = useRef<{ [key: string]: HTMLLIElement }>({});

  const cn = bem("CustomSelect");


  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue]);

  console.log(selectedOption)

  const handleShowOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
    setSearchTerm("");
  };

  const increaceSkip = () => {
    setSkip(skip + 1);
  };
  useEffect(() => {
    if (props.waiting) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && canLoad) {
        increaceSkip();
      }
    });
    if (lastElement.current) {
      observer.observe(lastElement.current);
    }
    return () => {
      if (lastElement.current) {
        observer.unobserve(lastElement.current);
      }
    };
  }, [canLoad, increaceSkip]);

  //поиск
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    searchOption(event.target.value);
  };


  const handleOptionClick = (option: Option) => {
    props.setArrSelectedCountries(option._id);
    setSelectedOption([option]);
    props.onChange(option);
    setSearchTerm("");

    setShowOptions(false);
  };

 

  const handleKeyOpenClose = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setShowOptions(true);
    } else if (event.key === "Escape") {
      setShowOptions(false);
    }
  };

  //навигация клавишами
  // выбор элемента

  const handleOptionKeyDown = (event: React.KeyboardEvent, option: Option) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(option);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextOption = getNextOption(option);
      setFocusedOption(nextOption);
      liRefs.current[nextOption._id].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevOption = getPreviousOption(option);
      setFocusedOption(prevOption);
      liRefs.current[prevOption._id].focus();
    }
  };

  const getNextOption = (option: Option) => {
    const currentIndex = props.options.findIndex(
      (item) => item._id === option._id
    );
    return props.options[
      currentIndex === props.options.length - 1 ? 0 : currentIndex + 1
    ];
  };

  const getPreviousOption = (option: Option) => {
    const currentIndex = props.options.findIndex(
      (item) => item._id === option._id
    );
    return props.options[
      currentIndex === 0 ? props.options.length - 1 : currentIndex - 1
    ];
  };
  const deleteFromSelected = (option: Option)=>{
  props.setArrSelectedCountries(option._id);
  props.onChange(option);
  }

  return (
    <div
      className={cn()}
      tabIndex={0}
      onKeyDown={handleKeyOpenClose}
      // onClick={(e) => handleShowOptions(e)}
    >
      <div className={cn("choozen")}>
        {selectedOption && selectedOption?.map((item:any) => (
          <div className={cn("header")} key={item.code} onClick={ ()=> deleteFromSelected(item)}>
            <span className="selectedOptions">{item?.code}</span>
          </div>
        ))}
        <div className={cn("arrow")}  onClick={(e) => handleShowOptions(e)}>
          <i
            className={showOptions ? "arrow arrowOpen" : "arrow arrowClose"}
          ></i>
        </div>
      </div>
      <div className={cn("container")}>
        {showOptions && (
          <div className={cn("scrollWrapper")}>
            <ul className={cn("ul")}>
              <li key="1" className="selectInputWrapper">
                <input
                  onClick={(e) => e.stopPropagation()}
                  className="selectInput"
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Поиск"
                />
              </li>
              {props.options.map((option) => (
                <li
                  key={option._id}
                  className={
                    option?.title === selectedOption?.title ? "liChosen" : ""
                  }
                  role="option"
                  aria-selected={option === selectedOption}
                  id={option._id}
                  tabIndex={0}
                  onClick={() => handleOptionClick(option)}
                  ref={(el) => (liRefs.current[option._id] = el)}
                  onKeyDown={(event) => handleOptionKeyDown(event, option)}
                >
                  <span className="optionName">{option.code}</span>
                  {option.title}
                </li>
              ))}
            </ul>

            <div ref={lastElement}>
              {props.waiting ? <LoadingAnimation /> : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
