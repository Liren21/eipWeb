export const onInitNewRow = (e: any,defaultData) => {
    e.data = { ...defaultData, ...e.data };
}
