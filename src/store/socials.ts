import type { Props as IconProps } from "../components/uiKit/Icon/Icon.astro";
import type { TKey } from "../utils/i18next/main";

const socials: Array<{
    iconName: IconProps["iconName"];
    tkey: TKey;
    href: string;
}> = [
        {
            iconName: "social-telegram",
            tkey: "@common.@socials.telegramChannel",
            href: "https://t.me/arbitroom_io",
        },
        {
            iconName: "social-telegram",
            tkey: "@common.@socials.telegramChat",
            href: "https://t.me/+Z0XUvV93_RUyODli",
        },
        {
            iconName: "social-mail",
            tkey: "@common.@socials.mail",
            href: "mailto:support@arbitroom.io",
        },
        {
            iconName: "social-youtube",
            tkey: "@common.@socials.youtube",
            href: "https://youtube.com/channel/UCVmzaOzDoPOwIHs3nIQbEwg",
        },
    ]

export default socials;