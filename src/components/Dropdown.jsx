import React, { useState } from 'react'


const Dropdown = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-2" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div>{isActive ? '\\/' : '/\\'}</div>
            </div>
            {isActive && <div className="flex flex-col">
            {content.map(content => {
               return (<p>{content.label}</p>)
            })}</div>}
        </div>
    )
}

export default Dropdown