import ru from "./ru.json"

// FAKE i18next, while astro-i18next is not working

const t = (tKey: keyof typeof ru) => {
    return ru[tKey] || tKey
}

const i18next = {
    language: "ru"
}

export default i18next
export { t }