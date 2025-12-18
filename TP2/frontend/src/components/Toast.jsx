import { useState, useEffect } from "react";

function Toast(message) {
    const [toastDisplay, setToastDisplay] = useState(false);

    useEffect(() => {
        if (message.text) {
            setToastDisplay(true);
            const timeout = setTimeout(() => {
                setToastDisplay(false);
            }, 3000);

            return () => {
                clearTimeout(timeout);
            }
        }
    }, [])
    return (
        <>
            {toastDisplay && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}
        </>
    )
};

export default Toast;
