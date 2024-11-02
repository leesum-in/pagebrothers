type Debounce<T extends unknown[]> = (...args: T) => void;

function debounce<T extends unknown[]>(func: (...args: T) => void, delay: number): Debounce<T> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: T) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default debounce;
