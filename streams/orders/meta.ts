type EventMeta = {
  type: "event";

  // Идентификатор мероприятия
  id: string;

  // Количество доступных к продаже билетов в мероприятии
  tickets_available: number;

  // Минимальная цена билетов в мероприятии (в копейках/центах)
  price_min?: number;

  // Валюта минимальной цены билетов в мероприятии (default "RUB")
  currency?: "USD" | "EUR" | "RUB" | "GBP" | "CNY";

  rating?: number; // Рейтинг мероприятия нормализированный к виду (integer): 0-100

}
