import * as React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { User } from '../../../../../../types/Users';

interface Props {
  user: User;
  onEdit: Function;
  onDelete: Function;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    }
  })
);

export function UserItem(props: Props) {
  const classes = useStyles();

  // TODO add confirmation dialog
  const onDelete = () => {
    props.onDelete(props.user?.id);
  };

  const onEdit = () => {
    props.onEdit(props.user?.id);
  };

  return (<>
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar alt={props.user.first_name} src={props.user.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary='Brunch this weekend?'
        secondary={
          <>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              {`${props.user.first_name} ${props.user.last_name} `}
            </Typography>
            {props.user.email}
          </>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='edit' onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton edge='end' aria-label='delete' onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
    <Divider variant='inset' component='li' />
  </>);
}
