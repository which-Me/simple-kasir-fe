export const StockButton = ({ children, maxChildren, onPlus, onMinus }) => {
  return (
    <>
      <div className="max-w-28 border-default-500 border-2 rounded-md flex flex-1 justify-between items-center">
        <div
          className={`${
            children == 1 && "bg-transparent hover:bg-transparent"
          } px-3 bg-default-500 hover:bg-default-400 cursor-pointer`}
          onClick={onMinus}
        >
          -
        </div>
        <span className="text-sm text-default-700 items-center">
          {children}
        </span>
        <div
          className={`${
            children == maxChildren && "bg-transparent hover:bg-transparent"
          } px-3 bg-default-500 hover:bg-default-400 cursor-pointer`}
          onClick={onPlus}
        >
          +
        </div>
      </div>
    </>
  );
};
