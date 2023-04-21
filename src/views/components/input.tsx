const LabelInput = ({ label, type, name, forwardRef }: {
    label: string,
    type: React.HTMLInputTypeAttribute,
    name: string,
    forwardRef: React.RefObject<HTMLInputElement>
}) => {
    return (<>
        <label>
            <span>{label}:</span>
            <input type={type} name={name} ref={forwardRef}/>
        </label>
        <style jsx>{`
            span {
                font-weight: bold;
            }

            label {
                display: flex;
                background-color: var(--light-2);
                font-size: 18px;
                color: var(--font-color-1);
                margin-bottom: 20px;
                gap: 10px;
            }
            
            input {
                width: 100%;
                background-color: transparent;
                border: 0;
                outline: none;
                font-size: 18px;
                border-bottom: 2px solid var(--font-color-1);
                color: var(--font-color-2);
            }
        `}</style>
    </>);
}

const LabelSelect = ({ label, name, options, forwardRef }: {
    label: string,
    name: string,
    options: {value: string, text: string}[],
    forwardRef: React.RefObject<HTMLSelectElement>
}) => {
    return (<>
        <label>
            <span>{label}:</span>
            <select name={name} ref={forwardRef}>
                <option disabled>Selecciona una opción</option>
                {options.map(({value, text}, index) => 
                    <option value={value} key={`select-option-${index}`}>{text}</option>
                )}
            </select>
        </label>
        <style jsx>{`
            span {
                font-weight: bold;
            }

            label {
                display: flex;
                background-color: var(--light-2);
                font-size: 18px;
                color: var(--font-color-1);
                margin-bottom: 20px;
                gap: 10px;
            }
            
            select {
                width: 100%;
                background-color: transparent;
                border: 0;
                outline: none;
                font-size: 18px;
                border-bottom: 2px solid var(--font-color-1);
                color: var(--font-color-2);
            }

            option {
                background-color: var(--background-1);
                color: var(--font-color-1);
            }
        `}</style>
    </>);
}

export {
    LabelInput,
    LabelSelect
}