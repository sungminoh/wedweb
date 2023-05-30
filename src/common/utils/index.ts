import { DATA_LINK } from "@/config";


export const toDateString = (date: Date, format: String) => {
  return format
    .replace("%Y", date.getFullYear().toString())
    .replace("%m", (date.getMonth()+1).toString())
    .replace("%d", date.getDate().toString())
    .replace("%a", '일월화수목금토'[date.getDay()])
    .replace("%H", date.getHours().toString())
    .replace("%p", ['오전', '오후'][date.getHours() < 12 ? 0 : 1])
}


let dataCache = { data: null, when: 0 };
export const getData = async () => {
  if (dataCache.when < Date.now() - 10000) {
    const data = await fetch(DATA_LINK)
      .then((r) => r.text())
      .then(JSON.parse);
    dataCache = { data , when: Date.now() };
  }
  return dataCache.data;
};


export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;


export function timeDiffFormat(date: Date) {
  const milliSeconds = Date.now() - date.getTime();
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
}