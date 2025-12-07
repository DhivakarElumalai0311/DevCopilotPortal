// Here are some examples of how we use our secondary palette.
// We recommend colorshould be used in the order of

// priority:
// 1. Avanade Orange
// 2. Avanade Pink
// 3. Avanade Purple
// 4. Avanade Scarlet
// 5. Avanade Gold
// 6. Avanade Green
// 7. Avanade Aqua
// 8. Avanade Blue

import { createTheme } from "@fluentui/react";
import { BrandVariants, createLightTheme } from "@fluentui/react-components";

export const ThemeColors = {
  AvanadeOrange: "#FF5800",
  AvanadeDarkOrange: "#DC4600",

  AvanadePink: "#CE056A",
  AvanadeDarkPink: "#A50646",

  AvanadeLightGold: "#FFD300",
  AvanadeGold: "#FFB414",
  AvanadeDarkGold: "#E6A61C",

  AvanadeLightBlue: "#699ABE",
  AvanadeBlue: "#006EC6",
  AvanadeDarkBlue: "#004B7D",

  AvanadeScarlet: "#C80000",
  AvanadeDarkScarlet: "#9E120E",

  AvanadeAqua: "#008C95",
  AvanadeDarkAqua: "#005F62",

  AvanadePurple: "#890078",
  AvanadeDarkPurple: "#5A1455",

  AvanadeLightGreen: "#95BF74",
  AvanadeGreen: "#4D912A",
  AvanadeDarkGreen: "#05732A",

  AvanadeRed: "#FF0000",

  Avanade80: "#333333",
  Avanade70: "#4C4C4C",
  Avanade60: "#666666",
  Avanade50: "#7F7F7F",
  Avanade40: "#999999",
  Avanade30: "#B2B2B2",
  Avanade20: "#CCCCCC",
  Avanade10: "#E5E5E5",
};

export const uiThemeOptions = {
  palette: {
    themePrimary: ThemeColors.AvanadeOrange,
    themeLighterAlt: "#fff8f5",
    themeLighter: "#ffe4d6",
    themeLight: "#ffcdb3",
    themeTertiary: ThemeColors.AvanadePurple,
    themeSecondary: ThemeColors.AvanadePink,
    themeDarkAlt: ThemeColors.AvanadeDarkOrange,
    themeDark: "#c24400",
    themeDarker: "#8f3200",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
};

const brandRamp: BrandVariants = {
  "10": "#200b00",
  "20": "#401600",
  "30": "#602100",
  "40": "#802c00",
  "50": "#9f3700",
  "60": "#bf4200",
  "70": "#df4d00",
  "80": ThemeColors.AvanadeOrange,
  "90": "#ff6919",
  "100": "#ff7933",
  "110": "#ff8a4d",
  "120": "#ff9b66",
  "130": "#ffac80",
  "140": "#ffbc99",
  "150": "#ffcdb3",
  "160": "#ffdecc",
};

export const fluentV8Theme = createTheme(uiThemeOptions);
export const fluentV9Theme = createLightTheme(brandRamp);
