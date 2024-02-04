import {SvgProps} from 'react-native-svg';

interface University {
  id: number;
  name: string;
  icon: React.FC<SvgProps>;
}

export default University;
