import React from 'react';
import {Box} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => createStyles({
  section: {
    margin: 20,
    marginBottom: 60,
    [theme.breakpoints.down('sm')]: {
      margin: 10,
    }
  },
  title: {
    color: '#6594e0',/*文字色*/
    borderBottom: 'dashed 2px #6594e0',
    fontSize: '1.5em',
  },
  content: {
    margin: 20,
    fontSize: '1.2em',
    [theme.breakpoints.down('sm')]: {
      margin: 5,
    }
  },
}));

interface Props {
  children: React.ReactNode;
}

interface SectionProps {
  maxWidth?: string | number,
  children: React.ReactNode;
}

export function Section({maxWidth, children}: SectionProps) {
  const classes = useStyles()
  if (maxWidth) {
    return (
      <Box className={classes.section} style={{maxWidth: maxWidth}}>
        {children}
      </Box>
    )
  }
  return (
    <Box className={classes.section}>
      {children}
    </Box>
  )
}

export function SectionTitle({children}: Props) {
  const classes = useStyles()
  return (
    <Box className={classes.title}>
      {children}
    </Box>
  );
}

export function SectionContent({children}: Props) {
  const classes = useStyles()
  return (
    <Box className={classes.content}>
      {children}
    </Box>
  );
}

interface SectionListProps {
  items: string[]
}
export function SectionList({items}: SectionListProps) {
  return (
    <ul>
      {items.map(item => (
        <li>{item}</li>
      ))}
    </ul>
  )
}
