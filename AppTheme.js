const AppTheme = {
    colors: {
        primary: {
            50: "#fadddd",
            100: "#FEE3D3",
            200: "#FDC1A7",
            300: "#FA977A",
            400: "#F56F59",
            500: "#EF3024",
            600: "#CD1A1E",
            700: "#AC1222",
            800: "#8A0B23",
            900: "#720624",
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
            100: "#E8FCD8",
            200: "#CBFAB3",
            300: "#A5F18A",
            400: "#80E46A",
            500: "#4CD33D",
            600: "#2FB52C",
            700: "#1E9726",
            800: "#137A22",
            900: "#0B651F",
        },
        info: {
            50: "#e0f6fd",
            100: "#CFF0FE",
            200: "#A0DCFD",
            300: "#70C3FB",
            400: "#4CA9F7",
            500: "#1382F2",
            600: "#0D64D0",
            700: "#094BAE",
            800: "#06348C",
            900: "#032574",
        },
        warning: {
            50: "#fcf2e0",
            100: "#FDF6CC",
            200: "#FCEB99",
            300: "#F8DB66",
            400: "#F2CA3F",
            500: "#EAB104",
            600: "#C99302",
            700: "#A87602",
            800: "#875C01",
            900: "#704900",
        },
        danger: {
            50: "#fdebe5",
            100: "#FDE3D2",
            200: "#FCC0A5",
            300: "#F89577",
            400: "#F16C55",
            500: "#E82D20",
            600: "#C7171A",
            700: "#A7101F",
            800: "#860A21",
            900: "#6F0622"
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
