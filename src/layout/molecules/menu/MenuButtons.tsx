import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import {myUrl} from "../../Urls";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const LinkedMenuItem = ({onClick, url, label} :{onClick: any, url: string, label: string}) => (
  <Link to={() => url} style={{ textDecoration: 'none', color: '#000' }}>
    <StyledMenuItem>
      <ListItemText onClick={onClick} primary={label} />
    </StyledMenuItem>
  </Link>
)

export default function MenuButtons() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <LinkedMenuItem onClick={handleClose} url={myUrl.top} label={'FIREシミュレーター'} />
        <LinkedMenuItem onClick={handleClose} url={myUrl.tax} label={'税金計算'} />
        <LinkedMenuItem onClick={handleClose} url={myUrl.annuity} label={'年金計算'} />
      </StyledMenu>
    </div>
  );
}
