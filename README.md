# Vibeapp интеграция

## 1. Текущая интеграция с Ticketscloud

В настоящее время Vibeapp получает данные о мероприятиях и билетах через Kafka стримы, предоставляемые Ticketscloud. Эти стримы включают информацию о новых мероприятиях, организаторах и заказах билетов. Сообщения передаются в формате [Protobuf](https://developers.google.com/protocol-buffers).

_В текущем виде являются избыточными для сторонней интеграции, так как содержат множество полей с узкоспециализированной информацией._

**Топики Kafka:**

- Организаторы: Информация об организаторах мероприятий ([Partner Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/partner.proto))
- Мероприятия: События, создаваемые организаторами ([Event Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/event.proto))
- Заказы: Данные о заказах ([Order Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/order.proto))
- Возвраты: Информация о возвратах билетов ([Refund Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/refund_request.proto))

Стрим возвратов используется для обновления статусов билетов в Vibeapp.

## 2. Планируемая интеграция с Vibeapp

Базово предлагается рассмотреть два варианта интеграции для передачи информации о билетах и их статусах в Vibeapp. Сообщения можно передавать в формате JSON или Protobuf, в зависимости от согласования между командами.

### 2.1. Через стрим заказов

По аналогии с текущей интеграцией, планируется использовать Kafka стрим заказов из Ticketscloud для получения информации о проданных билетах и обновлении статусов заказов в Vibeapp. Потребуется также внедрить стрим возвратов для обработки возвращенных билетов.

**Топики Kafka:**

- Организаторы: Информация об организаторах мероприятий ([Organizer JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/organizers.ts), [Organizer Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/organizers.proto)). Важно: информация об организаторах должна быть синхронизирована заранее, до обработки стримов с мероприятиями и заказами.
- Мероприятия: События, создаваемые организаторами ([Event JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/events.ts), [Event Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/events.proto)). Важно: информация о мероприятиях должна быть синхронизирована заранее, до обработки стримов с заказами.
- Заказы: Данные о заказах ([Order JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/orders.ts), [Order Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/orders.proto))
- Возвраты: Информация о возвратах билетов ([Refund JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/refunds.ts), [Refund Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/refunds.proto))

_Топики обсуждаются и могут быть изменены по согласованию между командами. Например, вместо отдельного топика с организаторами можно включить эту информацию в топик с мероприятиями и заказами и т.д._

### 2.1. Через стрим билетов

Планируется внедрить Kafka стрим, который будет передавать информацию о билетах, включая их статусы (например, активирован, использован, отменен).

**Топики Kafka:**

- Организаторы: Информация об организаторах мероприятий ([Organizer JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/organizers.ts), [Organizer Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/organizers.proto)). Важно: информация об организаторах должна быть синхронизирована заранее, до обработки стримов с мероприятиями и заказами.
- Мероприятия: События, создаваемые организаторами ([Event JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/events.ts), [Event Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/events.proto)). Важно: информация о мероприятиях должна быть синхронизирована заранее, до обработки стримов с заказами.
- Билеты: Данные о билетах и их статусах ([Ticket JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/tickets.ts), [Ticket Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/tickets/tickets.proto))

_Топики обсуждаются и могут быть изменены по согласованию между командами. Например, вместо отдельного топика с организаторами можно включить эту информацию в топик с мероприятиями и билетами и т.д._
