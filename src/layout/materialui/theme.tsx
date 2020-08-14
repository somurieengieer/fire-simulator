import {createMuiTheme} from '@material-ui/core/styles'

const base = {
  palette: {
    primary: {
      main: '#A5C3CF',
      contrastText: '#000000',
    },
    secondary: {
      light: '#F3D3B8',
      main: '#E59D5C',
      contrastText: '#000000',
    },
    error: {
      main: '#FF8888'

    },
    // warning: {
    //
    // },
    // info: {
    //
    // },
    // success: {
    //
    // }
  },
  typography: {
    fontFamily: [
      "游明朝体", "Yu Mincho", "YuMincho", "ヒラギノ明朝 Pro", "Hiragino Mincho Pro", "MS P明朝", "MS PMincho", "serif"
    ].join(','),
  },
};

const defaultTheme = createMuiTheme(  // #1
  Object.assign(base)
);

const mui = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h3: {
        fontSize: "2rem",
        [defaultTheme.breakpoints.down("xs")]: {
          fontSize: "1.5rem"
        }
      },
      h4: {
        fontSize: "2rem",
        [defaultTheme.breakpoints.down("xs")]: {
          fontSize: "1.2rem"
        }
      },
      caption: {
        fontSize: "1.4rem",
        [defaultTheme.breakpoints.down("xs")]: {
          fontSize: "1.0rem"
        }

      }
    }
  }
};

export const theme = mui;
