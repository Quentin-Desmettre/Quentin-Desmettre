const ElementRow = ({ children, className }) => (
    <div className={className + " flex flex-row justify-between items-center"}>
        {children}
    </div>
)

export default ElementRow
