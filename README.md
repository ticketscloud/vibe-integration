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

- Организаторы: Информация об организаторах мероприятий ([Organizer JSON](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/organizers.ts), [Organizer Proto](https://github.com/ticketscloud/vibe-integration/blob/main/streams/orders/organizer.proto))

### 2.1. Через стрим билетов

Планируется внедрить Kafka стрим, который будет передавать информацию о билетах, включая их статусы (например, активирован, использован, отменен).
