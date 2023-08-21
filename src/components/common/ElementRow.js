const ElementRow = ({ children, className }) => (
    <div className={className + " flex flex-row justify-evenly items-center"}>
        {children}
    </div>
)

export default ElementRow
