const AppTheme = {
    colors: {
        primary: {
            50: "#fadddd",
            100: "#FCDED0",
            200: "#FAB7A2",
            300: "#F08572",
            400: "#E1574D",
            500: "#CD1A1E",
            600: "#B01324",
            700: "#930D27",
            800: "#760827",
            900: "#620427",
        },
        secondary: {
            50: "#f5f5f5",
            100: "#F3F3F4",
            200: "#E7E7E9",
            300: "#BCBCBE",
            400: "#7C7C7E",
            500: "#282829",
            600: "#1D1D23",
            700: "#14141D",
            800: "#0C0C17",
            900: "#070713",
        },
        tertiary: {
            50: "#f5f5f5",
            100: "#F8F8F8",
            200: "#F1F1F1",
            300: "#D7D7D7",
            400: "#AFAFAF",
            500: "#7B7B7B",
            600: "#69595B",
            700: "#583D42",
            800: "#47272F",
            900: "#3B1723",
        },
        success: {
            50: "#f1fce4",
            100: "#EDFACF",
            200: "#D7F5A1",
            300: "#B3E16E",
            400: "#8BC446",
            500: "#5A9E17",
            600: "#458710",
            700: "#34710B",
            800: "#245B07",
            900: "#194B04",
        },
        info: {
            50: "#e0f6fd",
            100: "#C9EEF9",
            200: "#95D9F4",
            300: "#5CB2DE",
            400: "#3387BE",
            500: "#045393",
            600: "#02407E",
            700: "#023069",
            800: "#012155",
            900: "#001846",
        },
        warning: {
            50: "#fcf2e0",
            100: "#FDF6CB",
            200: "#FCEC97",
            300: "#F8DC63",
            400: "#F1CA3C",
            500: "#E8B100",
            600: "#C79300",
            700: "#A77700",
            800: "#865C00",
            900: "#6F4A00",
        },
        danger: {
            50: "#fdebe5",
            100: "#FBE2CD",
            200: "#F8C09D",
            300: "#EA9169",
            400: "#D56443",
            500: "#BA2A10",
            600: "#9F160B",
            700: "#850808",
            800: "#6B050D",
            900: "#590310"
        }
    },
    components: {
        Input: {
            defaultProps: {
                borderColor: 'warmGray.300',
                backgroundColor: '#ffffff',
                fontsize: 14,
                _focus: {
                    borderColor: 'warmGray.400',
                    backgroundColor: '#ffffff'
                }
            },
        },
        Button: {
            variants: {
                solid: (props) => {
                    const colorScheme = props.colorScheme
                    //console.log(colorScheme, `${props.theme.colors.primary['500']}`)
                    return {
                        rounded: "4",
                        backgroundColor: `${props.theme.colors.primary['500']}`,
                        _pressed: {
                            backgroundColor: `${props.theme.colors.primary['600']}`
                        }
                    };
                },
                whiteButton: (props) => {
                    return {
                        rounded: "4",
                        backgroundColor: "#ffffff",
                        color: `${props.theme.colors.text['900']}`,
                        justifyContent: "flex-start",
                        paddingTop:3,
                        paddingBottom:3,
                        _pressed: {
                            backgroundColor: `${props.theme.colors.text['100']}`
                        }
                    };
                }
            }
        }
    }
}

export default AppTheme;
