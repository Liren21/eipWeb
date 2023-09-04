export const ProcessClassifications = (e, classificationType) => {
    if (e.changes[0].data && e.changes[0].data[classificationType]) {
        const classificationData = e.changes[0].data[classificationType];
        delete e.changes[0].data[classificationType];
        e.changes[0].data[classificationType] = [{id: classificationData}];
    }
}
