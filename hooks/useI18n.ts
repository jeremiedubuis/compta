const i18n = {};

const translate = (key: string, options?: { [key: string]: string }) => {
    if (!i18n[key]) return key;
    if (options) {
        return Object.keys(options).reduce(
            (acc, curr) =>
                acc.replace(new RegExp(`{{\\s?${curr}\\s?}}`, 'g'), options[curr] as string),
            i18n[key]
        );
    }
    return i18n[key];
};

export const useI18n = () => {
    return [translate];
};
