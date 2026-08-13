export function Inputs({
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    touched,
    icon: Icon,
    rightElement
}) {
    return (
        <>
            <div className="flex items-center gap-3 bg-gray rounded-sm p-3 border border-gray-200 mb-1 w-full">

                <Icon size={20} />

                <input
                    type={type}
                    placeholder={placeholder}
                    className="w-full outline-none bg-transparent text-white"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                />

                {rightElement}

            </div>
        </>
    );
}