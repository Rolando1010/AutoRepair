const LabelContainer = ({ label, children }: { label: string, children: React.ReactNode }) => {
    return (<>
        <label>
            <span>{label}:</span>
            {children}
        </label>
        <style jsx>{`
            label {
                display: flex;
                background-color: var(--light-2);
                font-size: 18px;
                color: var(--font-color-1);
                margin-bottom: 20px;
                gap: 10px;
            }

            span {
                font-weight: bold;
            }
        `}</style>
    </>);
}

const DEFAULT_INPUT_STYLES = `
    width: 100%;
    background-color: transparent;
    border: 0;
    outline: none;
    font-size: 18px;
    border-bottom: 2px solid var(--font-color-1);
    color: var(--font-color-2);
`;

const LabelInput = ({ label, ...props }: {
    label: string,
} & React.InputHTMLAttributes<HTMLInputElement>) => {
    return (<>
        <LabelContainer label={label}>
            <input {...props}/>
        </LabelContainer>
        <style jsx>{`            
            input {
                ${DEFAULT_INPUT_STYLES}
            }
        `}</style>
    </>);
}

const LabelSelect = ({ label, options, ...props }: {
    label: string,
    options: {value: string, text: string}[],
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
    return (<>
        <LabelContainer label={label}>
            <select {...props}>
                <option disabled selected value="">Selecciona una opción</option>
                {options.map(({value, text}, index) => 
                    <option value={value} key={`select-option-${index}`}>{text}</option>
                )}
            </select>
        </LabelContainer>
        <style jsx>{`
            select {
                ${DEFAULT_INPUT_STYLES}
            }

            option {
                background-color: var(--background-1);
                color: var(--font-color-1);
            }
        `}</style>
    </>);
}

const LabelTextArea = ({ label, ...props }: {
    label: string,
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (<>
        <LabelContainer label={label}>
            <textarea {...props}></textarea>
        </LabelContainer>
        <style jsx>{`
            textarea {
                ${DEFAULT_INPUT_STYLES}
                border: 2px solid var(--font-color-1);
            }
        `}</style>
    </>);
}

export {
    LabelInput,
    LabelSelect,
    LabelTextArea
}