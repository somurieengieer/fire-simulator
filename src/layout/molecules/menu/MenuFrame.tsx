import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TopBarMenu from "./TopBarMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

interface Props {
  children: React.ReactNode;
}

export default function MenuFrame({children}: Props) {

  return (
    <TopBarMenu>
      {children}
    </TopBarMenu>
    // <ResponsiveDrawer>
    //   {children}
    // </ResponsiveDrawer>
  );
}