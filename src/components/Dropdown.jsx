import React, { useState, useEffect, useRef } from 'react'


const Dropdown = ({ title, content, setSelectedColl, setSelectedFilter }) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    let ddRef = useRef();
    document.addEventListener("mousedown", (e) => {
        if (!ddRef?.current?.contains(e.target) && isActive) {
            setIsActive(false)
        }

        e.stopPropagation();
    })


    function handleSelectOption(option) {
        setSelectedOption(option);
        setIsActive(false);
        if (title == 'Category') {
            setSelectedColl(option);
        } else {
            setSelectedFilter(option);
        }
    }

    return (
        <div className="flex flex-col" ref={ddRef}>
            <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div className="dropdown w-48 m-auto p-2 relative">
                    <div className='p-2 bg-[#f4f4f4] shadow font-medium text-sm w-48'>{selectedOption ? selectedOption.title : 'Choose your option'}</div>
                    {isActive && <div className="flex flex-col absolute z-[3] text-sm top-14 left-2 p-2 bg-[#f4f4f4]">
                        {content.map((content, index) => {
                            return (
                                <p key={index} onClick={() => handleSelectOption(content)}>
                                    {content.title}
                                </p>
                            )
                        })}
                    </div>}
                </div>

            </div>

        </div>
    )
}

export default Dropdown