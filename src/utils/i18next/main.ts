import ru from "./ru.json"

// FAKE i18next, while astro-i18next is not working

type TKey = keyof typeof ru;


const rawT = (tKey: TKey) => {
    return ru[tKey] || tKey;
}

const t = (tKey: TKey) => {
    const value = ru[tKey] || tKey;

    return value.replace(/<[^>]*>/g, "")
}

const i18next = {
    language: "ru"
}

export default i18next
export { t, rawT }
export type { TKey }