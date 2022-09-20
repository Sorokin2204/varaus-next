export const checkLocale = (value) => {
  return value ? value : <div class="text-danger">Перевод не найден</div>;
};
