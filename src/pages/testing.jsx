import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';


function MyPage() {
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);

  const handleSelect1 = (value) => {
    setSelectedValue1(value);
  }

  const handleSelect2 = (value) => {
    setSelectedValue2(value);
  }

  return (
    <div>
      <Dropdown title={'Category'} content={[
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' }
      ]}  />
      <p>Selected value 1: {selectedValue1}</p>

      <Dropdown title={'Filter'} content={[
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB' }
      ]}  />
      <p>Selected value 2: {selectedValue2}</p>
    </div>
  );
}

export default MyPage