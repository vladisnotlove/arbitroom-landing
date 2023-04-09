type TOptions = {
    baseTime?: number,
    rowsDeltaTime?: number,
    columnsDeltaTime?: number,
}

const defaultOptions: Required<TOptions> = {
    baseTime: 200,
    rowsDeltaTime: 50,
    columnsDeltaTime: 100,
}

const calculateCellDelay = (index: number, columnAmount: number, options: TOptions = {}) => {
    const {
        baseTime,
        rowsDeltaTime,
        columnsDeltaTime,
    } = {
        ...defaultOptions,
        ...options,
    };

    return (index % columnAmount) * columnsDeltaTime + Math.floor(index / columnAmount) * rowsDeltaTime + baseTime;
}

export default calculateCellDelay;