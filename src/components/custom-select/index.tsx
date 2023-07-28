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
  setSelectToCountry: (id: string) => void;
  resetSelectedCountries: () => void;
  error: string
}
export interface Option {
  _id: string;
  value: string | number;
  title: string;
  code: string;
  selected?: boolean;

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

  const [selectedOption, setSelectedOption] = useState<Option[]>(selectedValue);
  const [showOptions, setShowOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState<Option | null>(null);

  const lastElement = useRef<HTMLDivElement>(document.createElement("div"));
  const liRefs = useRef<{ [key: string]: HTMLLIElement }>({});

  const cn = bem("CustomSelect");

  //установка выбранной страны (страна либо все)
  useEffect(() => {
    if (selectedValue.length) {
      setSelectedOption(selectedValue);
    } else {
      setSelectedOption([{ _id: "", value: "", title: "Все", code: "All" }]);
    }
  }, [selectedValue]);

  //открытие/закрытие
  const handleShowOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
    setSearchTerm("");
  };

  //при появлении последнего эл отступ увеличивается
  // происходит дозагрузка
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

  // устанавливает страну, сбрасывает поиск и закрывает селект
  const handleOptionClick = (option: Option) => {
    // клик на "все"
    if (option._id === "") {
      props.resetSelectedCountries();
    } else {
      props.setArrSelectedCountries(option._id);
      setSelectedOption([...selectedOption,option]);
      props.onChange(option);
      props.setSelectToCountry(option._id);
      setSearchTerm("");
    }

    setShowOptions(false);
  };

  // закрытие селекта на клик снаружи
  const handleClickOutside = () => {
    if (showOptions) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOptions]);

  //навигация клавишами
  // открытие/ закрытие
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
  const deleteFromSelected = (option: Option) => {
    props.setArrSelectedCountries(option._id);
    props.onChange(option);
  };

  return (
    <div
      className={cn()}
      tabIndex={0}
      onKeyDown={handleKeyOpenClose}
      // onClick={(e) => handleShowOptions(e)}
    >
      <div className={cn("choozen")} >
        {selectedOption.length === 1 && selectedOption[0].code === "All" ? (
          selectedOption?.map((item: any) => (
            <div
              className={cn("header")}
              key={item.code}
              onClick={(e) => handleShowOptions(e)}
            >
              <span className="optionName oneVariant">{item?.code}</span>
              <p>{item.title}</p>
            </div>
          ))
        ) : (
          <div className="selectedList">
            {" "}
            {selectedOption?.map((item: any) => (
              <div
                className={cn("header")}
                key={item.code}
                onClick={() => deleteFromSelected(item)}
              >
                <span className="selectedOptions">{item?.code}</span>
              </div>
            ))}
          </div>
        )}
        <div className={cn("arrow")} onClick={(e) => handleShowOptions(e)}>
          <i
            className={showOptions ? "arrow arrowOpen" : "arrow arrowClose"}
          ></i>
        </div>
      </div>
      <div className={cn("container")}>
        {showOptions && (
          <div className={cn("scrollWrapper")} >
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
                  className={option?.selected ? "liChosen" : ""}
                  role="option"
                  //@ts-ignore
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
          { !props.error.length && 
            <div ref={lastElement}>
              {props.waiting ? <LoadingAnimation /> : ""}
            </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
