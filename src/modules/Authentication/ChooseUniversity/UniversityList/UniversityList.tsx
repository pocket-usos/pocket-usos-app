import React from 'react';
import University from '../University';
import {View} from 'react-native';
import UniversityItem from '@modules/Authentication/ChooseUniversity/UniversityList/UniversityItem.tsx';

export interface Props {
  universities: University[];
  chosenUniversityId: number | undefined;
  onUniversityChoose: (universityId: number) => void;
}

const UniversityList: React.FC<Props> = ({
  universities,
  chosenUniversityId,
  onUniversityChoose,
}) => {
  return (
    <View>
      {universities.map(u => (
        <UniversityItem
          key={u.id}
          name={u.name}
          icon={u.icon}
          isChosen={u.id === chosenUniversityId}
          onPress={() => onUniversityChoose(u.id)}
        />
      ))}
    </View>
  );
};

export default UniversityList;
