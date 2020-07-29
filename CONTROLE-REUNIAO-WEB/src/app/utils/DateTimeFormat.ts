// similar o timeToString, mas não trabalha com dias, apenas horas menores que 24:00
export function formatTime(time): string {
  let date = new Date();

  date.setHours(time.Hours)
  date.setMinutes(time.Minutes)

  let timeFormated = date.toLocaleString('pt-BR').substr(11, 5)

  return timeFormated;
}

// format hours from backend to string
export function timeToString(time: any): string {
  let minutes = `${time.Minutes}`.length == 1 ? `0${time.Minutes}` : `${time.Minutes}`;
  let hours = `${(time.Days * 24) + time.Hours}`.length == 1 ? `0${time.Hours}` : `${(time.Days * 24) + time.Hours}`;

  return `${hours}:${minutes}` == "00:00" ? "" : `${hours}:${minutes}`;
}

// format hours from backend to object
export function timeToObject(time: any): any {
  let minutes = time.Minutes;
  let hours = time.Days * 24 + time.Hours;

  return { hours, minutes }
}

export function formatTimeMillis(time: string): number {
  let horas, minutos;

  horas = time.split(":")[0];
  minutos = time.split(":")[1];

  let date = new Date(2020, 1, 1, horas, minutos);

  return date.getTime()
}

// usado na comparacao sort
export function comparacaoTime(a, b): number {
  if (a.Ticks > b.Ticks)
    return 1
  else return -1;
}
