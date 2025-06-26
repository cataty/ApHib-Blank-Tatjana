import { useState } from "react";

function Accordion({ title, children }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="accordion-block">
            <h2 className="accordion-trigger" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                {title} {open ? '▲' : '▼'}
            </h2>
            {open && <div className="accordion-content">{children}</div>}
        </div>
    );
}

export default Accordion;