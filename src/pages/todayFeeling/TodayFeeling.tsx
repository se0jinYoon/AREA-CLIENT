import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { FEELING_LIST } from './constants/constants';
import { ArrowLeftIc } from '../../assets/svgs';
import FullBtn from '../../components/commons/FullBtn';
import Header from '../../components/commons/Header';
import Spacing from '../../components/commons/Spacing';
import Title from '../../components/commons/Title';
import { moodState } from '../../states/moodState';
import { userState } from '../../states/userState';

const TodayFeeling = () => {
  const navigate = useNavigate();
  const [feelingArr, setFeelingArr] = useState(Array(9).fill(false));
  const [selectedFeeling, setSelectedFeeling] = useState('');
  const user = useRecoilValue(userState);
  const setMoodState = useSetRecoilState(moodState);

  const onClickBack = () => {
    navigate('/main');
  };

  const onClickFeeling = (id: number, feeling: string) => {
    const updatedFeeling = feelingArr.map((_, index) => index === id);
    setFeelingArr(updatedFeeling);
    setSelectedFeeling(feeling);
    setMoodState(feeling);
  };

  const onClickNext = () => {
    navigate('/character');
  };

  return (
    <>
      <Header LeftSvg={ArrowLeftIc} onClickLeft={onClickBack} />
      <Title text={`${user.nickName} 님\n오늘 기분은 어떠신가요?`} type="middle" align="center" />
      <Spacing marginBottom="5.197" />
      {/* 실제 상수 데이터로 바꿔야 함 */}
      <FeelingContainer>
        {FEELING_LIST.map((feeling) => (
          <FeelingBox
            key={feeling.id}
            onClick={() => onClickFeeling(feeling.id, feeling.feeling)}
            $isFeelingClicked={selectedFeeling !== ''}
            $isSelected={feelingArr[feeling.id]}>
            <feeling.defaultImg />
          </FeelingBox>
        ))}
      </FeelingContainer>
      <FullBtn
        activeText="다음으로"
        disabledText="다음으로"
        isBtnDisable={selectedFeeling === ''}
        onClick={onClickNext}
      />
    </>
  );
};

export default TodayFeeling;

const FeelingContainer = styled.section`
  display: grid;
  gap: 0.85rem;

  width: 100%;
  height: 33.503rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const FeelingBox = styled.div<{ $isSelected: boolean; $isFeelingClicked: boolean }>`
  /* background-color: ${({ theme }) => theme.colors.key}; */

  cursor: pointer;
  opacity: ${({ $isSelected, $isFeelingClicked }) => ($isFeelingClicked ? ($isSelected ? '' : '10%') : '')};
  aspect-ratio: 1 / 1;
`;
