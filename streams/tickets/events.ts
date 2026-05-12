// Информация о мероприятии
export type Event = {
  // Уникальный идентификатор мероприятия
  id: string;

  // Название мероприятия
  name: string;

  // Категория мероприятия
  category:
  | "ballet"
  | "business"
  | "circus"
  | "concert"
  | "development"
  | "excursion"
  | "exhibition"
  | "festival"
  | "games"
  | "health"
  | "kids"
  | "movie"
  | "museum"
  | "musical"
  | "party"
  | "show"
  | "sport"
  | "standup"
  | "test"
  | "theater"
  | "workshop"
  | "other";

  // Дата и время начала и окончания мероприятия (Unix timestamp)
  start_at: number;
  finish_at: number;

  // Идентификатор организатора мероприятия
  organizer_id: string;

  // Опциональные детали мероприятия
  media?: string; // URL изображения мероприятия
  timezone?: string; // Часовой пояс мероприятия
  description?: string; // Описание мероприятия

  // Место проведения мероприятия
  venue?: {
    // Название места проведения
    name: string;

    // Адрес места проведения
    address?: string;

    // Дополнительная информация о месте проведения
    description?: string;

    // Почтовый индекс и город места проведения
    zipcode?: string;
    city_name?: string;

    // Координаты места проведения
    lat?: number;
    lon?: number;
  };
};
