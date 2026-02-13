# Vibeapp интеграция

## 1. Планируемая интеграция с Vibeapp

Для упрощения интеграции предлагается два варианта передачи данных о билетах и их статусах в Vibeapp.
Формат сообщений — **JSON или Protobuf**, по договорённости между командами.

```mermaid
flowchart LR
    TL[Ticketland]
    V[Vibeapp]

    subgraph Kafka
        E[Events]
        OR[Orders]
        R[Refunds]
    end

    TL --> E
    TL --> OR
    TL --> R

    E --> V
    OR --> V
    R --> V

    V --> DB[(Vibe DB)]
```

Vibeapp получает информацию о проданных билетах и их статусах из стрима заказов,
а изменения статусов — из стрима возвратов.

**Топики Kafka:**

- **Мероприятия** —
  [Event JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/events.ts)
  (_Должны быть синхронизированы до обработки заказов_)
- **Заказы** —
  [Order JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/orders.ts),
- **Возвраты** —
  [Refund JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/refunds.ts),

_Набор топиков может быть изменён по согласованию между командами в зависимости от потребностей._

---

### 2. Формат сообщений в Kafka

_Примеры сообщений в формате JSON приведены в соответствующих файлах по ссылкам выше._
Для Protobuf-сообщений схемы также доступны по ссылкам в описании топиков.

Для сообщений обязательно указывать следующие заголовки:

- `content-type`: `application/json` или `application/x-protobuf`
- `schema-version`: версия схемы сообщения (например, `1.0`)
- `application-id`: идентификатор источника данных (например, `ticketland`)

В качестве ключа сообщения рекомендуется использовать уникальный идентификатор сущности (например,
`event_id`, `order_id`).

---

## 3. Текущая интеграция с Ticketscloud

В настоящее время Vibeapp получает данные о мероприятиях и билетах из Kafka-стримов Ticketscloud.
Стримы передают информацию об организаторах, мероприятиях, заказах и возвратах билетов.
Формат сообщений — [Protobuf](https://developers.google.com/protocol-buffers).

_Текущие стримы ориентированы на внутренние процессы Ticketscloud и избыточны для внешней интеграции, так как содержат много специализированных полей._

**Kafka-топики:**

- **Организаторы** — данные об организаторах мероприятий
  ([Partner Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/partner.proto))
- **Мероприятия** — события, создаваемые организаторами
  ([Event Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/event.proto))
- **Заказы** — информация о заказах и купленных билетах
  ([Order Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/order.proto))
- **Возвраты** — данные о возвратах билетов
  ([Refund Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/refund_request.proto))

Стрим возвратов используется для актуализации статусов билетов в Vibeapp.
