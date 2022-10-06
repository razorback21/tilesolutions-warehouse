const AppTheme = {
    colors: {
        primary: {
            50: "#fadddd",
            100: "#FDDFD2",
            200: "#FBB8A5",
            300: "#F38777",
            400: "#E85A54",
            500: "#DA212A",
            600: "#BB182E",
            700: "#9C1030",
            800: "#7E0A2F",
            900: "#68062E",
        },
        secondary: {
            50: "#f3eae5",
            100: "#F3E5DA",
            200: "#E7C9B9",
            300: "#B88F81",
            400: "#724E47",
            500: "#140B0A",
            600: "#110707",
            700: "#0E0505",
            800: "#0B0304",
            900: "#090103",
        },
        success: {
            50: "#f1fce4",
            100: "#F3FBCB",
            200: "#E5F79A",
            300: "#CAE864",
            400: "#ACD23D",
            500: "#84B50A",
            600: "#6C9B07",
            700: "#578205",
            800: "#426803",
            900: "#345601",
        },
        info: {
            50: "#e0f6fd",
            100: "#C9F2FB",
            200: "#95E0F8",
            300: "#5EC0EA",
            400: "#369CD5",
            500: "#016DBA",
            600: "#00549F",
            700: "#003F85",
            800: "#002C6B",
            900: "#001F59",
        },
        warning: {
            50: "#fcf2e0",
            100: "#FCF3CA",
            200: "#FAE496",
            300: "#F2CD61",
            400: "#E6B539",
            500: "#D69200",
            600: "#B87700",
            700: "#9A5F00",
            800: "#7C4800",
            900: "#663800",
        },
        danger: {
            50: "#fdebe5",
            100: "#FDE5D1",
            200: "#FBC5A5",
            300: "#F49B77",
            400: "#E97353",
            500: "#DB3920",
            600: "#BC2017",
            700: "#9D1013",
            800: "#7F0A16",
            900: "#690618"
        }
    },
    components: {
        Input: {
            defaultProps: {
                _focus: {
                    borderColor: 'warmGray.400',
                    backgroundColor: 'transparent'
                }
            },
        },
        Button: {
            variants: {
                solid: (props) => {
                    console.log(props);
                    const colorScheme = props.colorScheme
                    console.log(colorScheme, `${props.theme.colors.warning['100']}`)
                    return {
                        rounded: "full"
                    };
                }
            }
        }
    }
}

export default AppTheme;
