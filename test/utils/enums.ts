type getTrans = (text:string) => string;

export const Menu = (t:getTrans) => [
    {title: t("common:menu.home.title")},
    {title: t("common:menu.contents.title"),
        sub: [
            t("common:menu.contents.sub.poi"),
            t("common:menu.contents.sub.ar")
        ]}
];
export type menuType = ReturnType<typeof Menu>;
