import type { IInvitation, IntroDateFormatKey, WidgetType } from '@/types/pageBrothers.type';

export function formatDate(time: string | null, dateFormatKey: IntroDateFormatKey): string {
  const date = time ? new Date(time) : new Date();

  // 날짜 구성 요소 추출
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getDate();
  const dayOfWeek = date.getDay(); // 0 (일요일)부터 6 (토요일)까지

  const hours24 = date.getHours(); // 0부터 23까지
  const minutes = date.getMinutes();

  // 오전/오후 및 12시간제 시간 계산
  const isAM = hours24 < 12;
  const hours12 = hours24 % 12 || 12; // 0시를 12시로 표시

  const ampmKR = isAM ? '오전' : '오후';
  const ampmEN = isAM ? 'AM' : 'PM';

  // 요일 이름 배열
  const weekdaysKR = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const weekdayKR = weekdaysKR[dayOfWeek];

  const weekdaysEN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const weekdayEN = weekdaysEN[dayOfWeek];

  // 두 자리 숫자 패딩 함수
  function padZero(num: number): string {
    return num.toString().padStart(2, '0');
  }

  // dateFormatKey에 따른 날짜 형식 반환
  if (dateFormatKey === 'KO') {
    return `${year}년 ${month}월 ${day}일 ${weekdayKR} ${ampmKR} ${hours12}시 ${minutes ? `${minutes}분` : ''}`;
  } else if (dateFormatKey === 'KO_EXCLUDE_TIME') {
    return `${year}년 ${month}월 ${day}일 ${weekdayKR}`;
  } else if (dateFormatKey === 'EN') {
    return `${year}. ${padZero(month)}. ${padZero(day)}. (${weekdayEN}) ${hours12}:${padZero(minutes)} ${ampmEN}`;
  }
  return `${year}. ${padZero(month)}. ${padZero(day)}. (${weekdayEN})`;
}

export function getWidgetIndex(invitation: IInvitation | null, type: WidgetType) {
  if (!invitation) return null;
  return invitation.widgets.findIndex((item) => item.type === type);
}

// FileReader를 사용하여 파일을 Data URL로 읽어오는 함수
const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export async function getImageSize(file: File): Promise<{ width: number; height: number }> {
  try {
    const imageDataUrl = await readFileAsDataURL(file);
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.onerror = () => reject(new Error('이미지 로드 중 오류가 발생했습니다.'));
      img.src = imageDataUrl;
    });
  } catch (error) {
    throw new Error('파일을 읽는 중 오류가 발생했습니다.');
  }
}
