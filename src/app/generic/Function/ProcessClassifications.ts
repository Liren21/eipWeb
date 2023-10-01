export const ProcessClassifications = (e, classificationType) => {
    if (e.changes[0].data && Array.isArray(e.changes[0].data[classificationType])) {
        e.changes[0].data[classificationType] = e.changes[0].data[classificationType].map((item) => {
            if (typeof item === 'object' && 'id' in item) {
                // Если элемент уже является объектом с полем "id", не изменять его
                return item;
            } else if (typeof item === 'number') {
                return {
                    id: item,
                    // Другие поля, если необходимо
                };
            } else {
                // Обработка других случаев, если необходимо
                return null; // Или другое значение по умолчанию
            }
        }).filter(item => item !== null); // Фильтрация нулевых значений, если необходимо
    }
};

export const ProcessClassificationsObj = (data, key) => {
    if (data && data[key] !== undefined) {
        data[`${key}Id`] = data[key].id;
    }
}
