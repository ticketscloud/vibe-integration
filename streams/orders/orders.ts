// Информация о билете на мероприятие
type Ticket = {
	// Идентификатор билета
	id: string;

	// Штрихкод или QR-код билета
	barcode: string;

	// Серия и номер билета
	number?: string;
	series?: string;

	// Место на мероприятии
	row?: string;
	seat?: string;

	// Категория билета
	category: string;

	// Дополнительное описание билета
	description?: string;

	// Цена билета в номинале (в копейках/центах)
	price_nominal?: number;

	// Валюта цены билета
	currency?: "USD" | "EUR" | "RUB" | "GBP" | "CNY";
};

export type Order = {
	// Идентификатор заказа
	id: string;

	// Идентификатор мероприятия
	event_id: string;

	// Идентификатор организатора мероприятия
	organizer_id: string;

	// Информация о покупателе
	customer: {
		// Электронная почта покупателя билетов
		email: string;

		// Номер телефона покупателя билетов (c кодом страны, например +79001234567)
		phone: string;

		// ФИО покупателя билетов (если доступно)
		name?: string;
	};

	// Список билетов в заказе
	tickets: Ticket[];
};
