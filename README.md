# Vibeapp интеграция

## 1. Текущая интеграция с Ticketscloud

В настоящее время Vibeapp получает данные о мероприятиях и билетах через Kafka стримы, предоставляемые Ticketscloud. Эти стримы включают информацию о новых мероприятиях, организаторах и заказах билетов. Сообщения передаются в формате [Protobuf](https://developers.google.com/protocol-buffers).

- Организаторы: Информация об организаторах мероприятий ([Partner Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/partner.proto))
- Мероприятия: События, создаваемые организаторами ([Event Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/event.proto))
- Заказы: Данные о заказах ([Order Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/order.proto))
- Возвраты: Информация о возвратах билетов ([Refund Proto](https://github.com/ticketscloud/vibe-integration/blob/main/ticketscloud/refund_request.proto))

## 2. Планируемая интеграция с Vibeapp

### 2.1. Через стрим заказов

### 2.1. Через стрим билетов
