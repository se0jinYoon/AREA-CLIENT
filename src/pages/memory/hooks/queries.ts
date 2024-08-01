import { useQuery } from '@tanstack/react-query';
// import { useMutation,useQueryClient } from '@tanstack/react-query';

import getRecordList from '../apis/getRecordList';
import getTodayList from '../apis/getTodayRecord';

export const QUERY_KEY_MEMORY = {
  getRecordList: 'getRecordList',
  getTodayList: 'getTodayList',
};

// 지난 기록 리스트 get
export const useGetRecordList = (memberId: string, isLastClicked: boolean) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MEMORY.getRecordList, memberId],
    queryFn: () => getRecordList(memberId),
    enabled: !!isLastClicked,
  });

  const moodDiaryCards = data?.data?.moodDiaryCards;

  return { moodDiaryCards };
};

// 오늘 기록 get
export const useGetTodayList = (memberId: string, isTodayClicked: boolean) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MEMORY.getTodayList, memberId],
    queryFn: () => getTodayList(memberId),
    enabled: !!isTodayClicked,
  });

  const moodDiaryId = data?.data?.moodDiaryId;
  const assistant = data?.data?.assistant;
  const answer = data?.data?.answer;
  const summary = data?.data?.summary;

  return { moodDiaryId, assistant, answer, summary };
};
