import React from 'react';
import {View} from 'react-native';
import UniversityItem from '@modules/Authentication/ChooseUniversity/UniversityList/UniversityItem.tsx';
import University from '@modules/Authentication/Model/University';

export interface Props {
  universities?: University[];
  chosenUniversityId: string | undefined;
  onUniversityChoose: (universityId: string) => void;
}

const UniversityList: React.FC<Props> = ({
  universities,
  chosenUniversityId,
  onUniversityChoose,
}) => {
  if (universities === undefined) {
    return null;
  }

  return (
    <View>
      {universities?.map(u => (
        <UniversityItem
          key={u.id}
          name={u.name}
          logoUrl={u.logoUrl}
          isChosen={u.id === chosenUniversityId}
          isBeta={u.isBeta}
          onPress={() => onUniversityChoose(u.id)}
        />
      ))}
    </View>
  );
};

export default UniversityList;
