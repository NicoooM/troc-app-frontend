export const readableDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return `Aujourd'hui, ${formatTime(date)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Hier, ${formatTime(date)}`;
  } else {
    return `Le ${formatDate(date)}, ${formatTime(date)}`;
  }
};

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  return date.toLocaleDateString("fr-FR", options).replace(/\.$/, "");
};

const formatTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleTimeString("fr-FR", options);
};
