import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type ConfirmDialogProps = {
  title?: string,
  message: string,
  openFlag: boolean,
  closeFlag: () => void,
  callBackWhenYes: () => void,
  callBackWhenNo?: () => void,
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({title, message, openFlag, closeFlag, callBackWhenYes, callBackWhenNo}) => {
  const handleAlertClose = (e: any) => {
    e.stopPropagation(); //親要素のonClickを呼ばないように制御
    closeFlag();
  };

  const exec = (e: any) => {
    handleAlertClose(e)
    callBackWhenYes()
  }

  const selectedNo = (e: any) => {
    handleAlertClose(e)
    if (callBackWhenNo) {
      callBackWhenNo()
    }
  }
  return (
    <Dialog
      open={openFlag}
      onClose={handleAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title || '確認'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={exec}  autoFocus>
          はい
        </Button>
        <Button onClick={selectedNo}  autoFocus>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog
