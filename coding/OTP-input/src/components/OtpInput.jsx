import React, { useRef } from 'react';
function OtpInput() {
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
        if (e.target.value.length === 1 && index < 3) {
        inputRefs.current[index + 1].focus();
        } else if (e.target.value.length === 0 && index > 0) {
        inputRefs.current[index - 1].focus();
        }
    };
    
    return (
        <div>
        <input
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[0] = el)}
            onChange={(e) => handleChange(e, 0)}
        />
        <input
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[1] = el)}
            onChange={(e) => handleChange(e, 1)}
        />
        <input
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[2] = el)}
            onChange={(e) => handleChange(e, 2)}
        />
        <input
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[3] = el)}
            onChange={(e) => handleChange(e, 3)}
        />
        </div>
    );
    }
export default OtpInput;