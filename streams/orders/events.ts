// Информация о мероприятии
export type Event = {
	// Уникальный идентификатор мероприятия
	id: string;

	// Идентификатор группы мероприятий (если мероприятие является частью серии)
	group_id?: string;

	// Название мероприятия
	name: string;

	// Категория мероприятия
	category:
		| "ballet"
		| "business"
		| "concert"
		| "develpoment"
		| "excursion"
		| "exhibition"
		| "festival"
		| "health"
		| "kids"
		| "movie"
		| "museum"
		| "party"
		| "show"
		| "sport"
		| "test"
		| "theater"
		| "other";

	// Дата и время начала и окончания мероприятия (Unix timestamp)
	start_at: number;
	finish_at: number;

	// Опциональные детали мероприятия
	media?: string; // URL изображения мероприятия
	timezone?: string; // Часовой пояс мероприятия
	description?: string; // Описание мероприятия

	// Информация об организаторе мероприятия
	// --------------------------------------
	organizer?: {
		// Уникальный идентификатор организатора
		id: string;

		// Название организатора
		name: string;

		// Информация о ЮР лице организатора мероприятия
		legals?: {
			// Официальное  название организации
			name: string;

			// Тип ЮР лица
			// ru_lp - ИП
			// ru_ltd - ООО
			// en_ltd - Ltd (зарубежная компания)
			type: "ru_lp" | "ru_ltd" | "en_ltd";

			// ИНН, ОГРН и адрес организации
			inn?: string;
			ogrn?: string;
			address?: string;
		};
	};

	// Информация о месте проведения мероприятия
	// -----------------------------------------
	venue?: {
		// Уникальный идентификатор места проведения
		id: string;

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
