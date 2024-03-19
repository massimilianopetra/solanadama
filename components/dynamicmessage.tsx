import React, { useState, useEffect } from 'react';

interface DynamicMessageProps {
    message: string,
    color: string,
    timeout: number
}

/* const DynamicMessage: React.FC<DynamicMessageProps> = ({ message, color, timeout }) => { */
function  DynamicMessage ({ message, color, timeout }:DynamicMessageProps) { 
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            if (timeout > 0) {
                const t = setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
                return () => clearTimeout(t);
            }
        } else {
            // Se il messaggio diventa vuoto, reimposta lo stato showMessage a false
            setShowMessage(false);
        }
    }, [message]);

    return (
        <div className='p-10'>
            {showMessage && (
                <div className="text-white p-2 rounded-lg" style={{ backgroundColor: `${color}` }}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default DynamicMessage;