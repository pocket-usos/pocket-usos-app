import React from 'react';
import {connect, useDispatch} from 'react-redux';

import {closeNotification, NotificationState} from './state';
import {RootState} from '@store/store';
import Notification from './Notification';

const mapStateToProps = (state: RootState) => {
  return {
    notification: state.notification,
  };
};

type Props = {
  notification: NotificationState;
};

const NotificationController: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeNotification());

  return props.notification.isVisible ? (
    <Notification
      type={props.notification.type}
      message={props.notification.message}
      onClose={onClose}
    />
  ) : null;
};

export default connect(mapStateToProps)(NotificationController);
