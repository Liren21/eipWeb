export const ProcessClassifications = (e, classificationType,classificationName) => {
    if (e.changes[0].data && e.changes[0].data[classificationType]) {
        const classificationData = e.changes[0].data[classificationType];
        delete e.changes[0].data[classificationType];
        e.changes[0].data[classificationName] = [{id: classificationData.name}];
    }
}
export const ProcessClassificationsObj = (data, key) => {
    if (data && data[key] !== undefined) {
        const classificationData = data[key].id;
        delete data[key].id;
        data[`${key}Id`] = classificationData;
    }
}
