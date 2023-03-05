import React, { useState } from 'react'


const Dropdown = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function handleSelectOption(option) {
        setSelectedOption(option);
        setIsActive(false);
    }

    return (
        <div className="flex flex-col">
                <div className='p-2 bg-[#f4f4f4] shadow font-medium'>{selectedOption ? selectedOption.label : 'Choose your option'}</div>

            <div className="flex flex-row gap-2" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div>{isActive ? '\\/' : '/\\'}</div>
            </div>
            {isActive && <div className="flex flex-col">
            {content.map(content => {
               return (
                  <p key={content.value} onClick={() => handleSelectOption(content)}>
                     {content.label}
                  </p>
               )
            })}
            </div>}
            {/* {selectedOption && <p>Selected option: {selectedOption.label}</p>} */}
        </div>
    )
}

export default Dropdown